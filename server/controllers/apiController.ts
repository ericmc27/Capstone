import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { productsCollection } from "../main";
import { Stripe } from "stripe";

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
  const stripe = new Stripe(process.env.STRIPE_KEY as string);
  const cartItems = req.body
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


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    ui_mode: "custom",
    return_url: "http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}",
  });

  res.status(200).send({ clientSecret: session.client_secret });
};

export const storePayment = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_KEY as string);
  const { session_id } = req.params
  const session = await stripe.checkout.sessions.retrieve(`${session_id}`)
  console.log(session)
}