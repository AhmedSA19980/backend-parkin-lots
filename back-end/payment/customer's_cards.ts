import { Application } from "express";
import express, {Request, Response} from "express";
import Stripe from "stripe";


const app = express()
// Get List of all saved card of the customers
const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});


export default function (app:Application){
  app.get("/viewallcards", async (req:Request, res:Response) => {
  let cards:any = [];
  const {customer_Id} = req.body
  try {
    const savedCards = await stripe.customers.listSources(
      "cus_OOTlXk5kQE77LN",
      {
        object: "card",
      }
    );
    const cardDetails = Object.values(savedCards.data);

    cardDetails.forEach((cardData) => {
      
      let obj = {
        cardId: cardData.id,
        //cardType: cardData.brand,
        //cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
        //cardLast4: cardData.last4,
      };
      cards.push(obj);
    });
    return res.status(200).send({
      cardDetails: cards,
    });
  } catch (error:any) {
    return res.status(400).send({
      Error: error.raw.message,
    });
  }
 });
}