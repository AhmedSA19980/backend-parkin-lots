import express, { Application, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import customerid from "./addcustomer"
dotenv.config();

// Add a new card of the customer

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

const app = express()


export  default function (app:Application){

  app.post("/add_card", async(req:Request, res:Response)=>{


  const {
    customer_Id,
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCVC,
    cardName,
    country,
    postal_code,
  } = req.body;

  if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
    return res.status(400).send({
      Error: `Please Provide All Necessary Details to save the card ${cardExpMonth} & ${cardExpYear}`,
    });
  }
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_country: country,
        address_zip: postal_code,
      },
      
      //customer: customer.stripe_id,
      // stripe_account: StripeAccountId,
    });
     //* we me must set customer id in the first argument instead of str mutiple customer == var
    const card = await stripe.customers.createSource("cus_OOTlXk5kQE77LN", {
      source: `${cardToken.id}`,
    });
     console.log("CARD TOKEN",cardToken , "card",card)
    return res.status(200).send({
      card: card.id,
    });
    
  } catch (error:any) {
    return res.status(400).send({
      Error: error.raw.message || "cutomer not exit",
    });
  }
  })

}