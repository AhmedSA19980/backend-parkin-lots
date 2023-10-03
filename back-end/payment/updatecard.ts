import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import Stripe from "stripe";

const key = process.env.STRIPE_KEY;

const stripe = new Stripe(key as string, {
  apiVersion: "2022-11-15",
});

const app = express();

export default function (app: Application) {
  app.post("/updateCardDetails", async (req: Request, res: Response) => {
    let {cardId , cardExpMonth , cardExpYear , cardName} = req.body
    if (!cardId){
        return res.status(400).send({
            Error:"cardId is Required to update"
        })
    }
    try {
      const card = await stripe.customers.updateSource(
        "cus_OOW9KHrSglsa0u", //* customer id
        cardId,
        {
          name: cardName,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
        })
        return res.status(200).send({
        updatedCard:card,
      });
    } catch (error: any) {
      return res.status(400).send({ Error: error.raw.message });
    }
  });
}
