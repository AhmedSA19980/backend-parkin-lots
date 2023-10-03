import dotenv from 'dotenv';
dotenv.config();


import express, { Application, Request, Response } from "express";
import Stripe from "stripe";

const key =   process.env.STRIPE_KEY

const stripe = new Stripe(
  key as string,
  {
    apiVersion: "2022-11-15",
  }
);

const app = express();

export default function (app:Application) {
  app.post("/add_customer" , async (req:Request ,res:Response)=>{
  try {
    const customer = await stripe.customers.create(
      {
        email: req.body.email,
        name:req.body.name
      }
      // {
      //   // If you are using your own api then you can add your organization account here. So it will link the customer with your organization
      //   stripeAccount: process.env.StripeAccountId,
      //}
    );
    return res.status(200).send({
      //   customerDetails: customer,
      customerId: customer.id,
      customerEmail: customer.email,
      customerName:customer.name
    });
  } catch (error:any) {
    return res.status(400).send({ Error: error.raw.message });
  }
})

}
