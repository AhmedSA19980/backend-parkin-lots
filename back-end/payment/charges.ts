import express, { Application, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();



const app = express()

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});



export default function(app:Application){
  app.post("/charge" , async (req:Request, res:Response) => {

  const { amount, cardId, oneTime, email, customer_Id } = req.body;
  if (oneTime) {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      country,
      postalCode,
    } = req.body;
     // only one time pay
    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
      return res.status(400).send({
        Error: "Necessary Card Details are required for One Time Payment",
      });
    }
    try {
      const cardToken = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC,
          address_state: country,
          address_zip: postalCode,
        },
      });

      const charge = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        source: cardToken.id,
        receipt_email: email,
        description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
      });

      if (charge.status === "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for One Time Payment" });
      }
    } catch (error:any) {
      return res.status(400).send({
        Error: error.raw.message,
      });
    }
  } else { //pay with existing card
    try {
      const createCharge = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        receipt_email: email,
        customer: customer_Id,
        //card:cardId
        description: `Stripe Charge Of Amount ${amount} for Payment`,
      });
      console.log("\n\n Start 2");
      if (createCharge.status === "succeeded") {
        return res.status(200).send({ Success: createCharge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: error,
      });
    }}
  });
}