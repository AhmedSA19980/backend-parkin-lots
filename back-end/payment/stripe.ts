import express,{Application, Request,Response} from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { book } from "../calc/calcuate";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



type checkout = {
  
  price?:number   | undefined; 
  total_price?: number | undefined; 
  capacity?:number | undefined;
}

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

const app = express()
const YOUR_DOMAIN = process.env.URL_DOMAIN;
    

export default async function (app:Application){
   
    app.post ("/create-checkout-session", async (req: Request, res: Response) => {
      let capacity = 0;  
      const { startTime, endTime, userId, parkingLotId } = req.body;
        const parkinglot_id = await prisma.parkinglot.findUniqueOrThrow({
          where: { id: parkingLotId },
        });

        const calc = new book()
        const find_time = calc.getTimeCheck(startTime, endTime);
        const find_price = calc.calculatePrice(parkinglot_id!.hourlyRate, find_time);
        const total_cost = find_price * (1 + 0.15);
      
      const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items: 
        [
        {
          price_data:{
            currency:"usd",
            product_data:{name:"parkinglot_price"},
            unit_amount:total_cost! * 100,
        
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          },
          quantity: capacity!,
        },
      ],
  
      mode: "payment",
      success_url: `${process.env.URL_DOMAIN}/success.html`,
      cancel_url: `${process.env.URL_DOMAIN}/cancel.html`,
    });

    return res.json({sessionid:session.id})

  });
}  

