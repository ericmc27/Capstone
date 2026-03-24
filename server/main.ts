import 'dotenv/config'
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { apiRouter } from "./routes/apiRouter";
import { Collection } from "mongodb"
import { createMongoClient } from "./mongoDb";
import { storePayment } from './controllers/apiController';
import { Stripe } from "stripe";


const PORT = process.env.PORT || 1234;
export let productsCollection: Collection;

if(!process.env.STRIPE_KEY){
  throw new Error('STRIPE_KEY env variable is missing!')
}

export const stripe = new Stripe(process.env.STRIPE_KEY)

async function main() {
  const app = express();

  app.post('/stripe/webhook', express.raw({type: 'application/json'}), storePayment)
  app.use(express.json())

  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN,
      credentials: true,
    }),
  );

  app.all("/api/auth/{*any}", toNodeHandler(auth));
  app.use("/api", apiRouter);
  
  productsCollection = await createMongoClient();
  
  app.get("/", (req, res) => {
    res.send("<h1>Hello - Express</h1>");
  });

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

main()