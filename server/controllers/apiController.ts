import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { stripe, productsCollection } from "../main";
import type Stripe from "stripe";
import {prisma} from "../lib/prisma"

export const checkUserSession = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const userData = { name: session.user.name, email: session.user.email };
    res.status(200).json({ userData });
  }
};

export const checkUserAuthenication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const products = await productsCollection
    .aggregate([
      { $match: { sub_category: category } },
      { $sample: { size: 6 } },
    ])
    .toArray();
  res.status(200).send({ products });
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  const cartItems = req.body

  if(cartItems.length === 0){
    res.sendStatus(400)
  }

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.images[0]]
      },
      unit_amount: Math.round(Number(item.selling_price) * 100)
    },
    quantity: 1,
  }))

  const currentUser = await auth.api.getSession({headers: req.headers})

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    ui_mode: "custom",
    return_url: "http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}",
    metadata: {userId: currentUser?.session.userId ?? null}
  });

  res.status(200).send({ clientSecret: session.client_secret });
};

export const storePayment = async (req: Request, res: Response) => {
  // const stripe = new Stripe(process.env.STRIPE_KEY as string);
  // const { session_id } = req.params
  // const session = await stripe.checkout.sessions.retrieve(`${session_id}`)
  // console.log(session)
  const signature = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if(!signature || !webhookSecret){
    return res.sendStatus(400)
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)

    switch (event.type){
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await prisma.orders.create({data: {customerEmail: session.customer_details?.email ?? '', amountTotal: session.amount_total ?? 0, createdAt: new Date(session.created * 1000), paymentStatus: session.payment_status}})
        break
      
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.sendStatus(200)
  } catch (err) {
    console.log('Webhook signature verification failed!')
    res.sendStatus(400)
  }

 
}