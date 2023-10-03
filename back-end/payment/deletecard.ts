import express, { Application, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Add a new card of the customer

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});
const app = express();


export default function (app:Application){

    // Delete a saved card of the customer
    app.post("/delete_card", async (req:Request, res:Response) => {
    console.log("\n\n Body Passed:", req.body);
    const { cardId, customer_Id } = req.body;
    if (!cardId) {
        return res.status(400).send({
        Error: "CardId is required to delete Card",
        });
    }
    try {
        const deleteCard = await stripe.customers.deleteSource(
          "cus_OOTlXk5kQE77LN",
           cardId
         
          );
        return res.status(200).send(deleteCard);
    } catch (error:any) {
        return res.status(400).send({
        Error: error.raw.message,
        });
    }
    });
}