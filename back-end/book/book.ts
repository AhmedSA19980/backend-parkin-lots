import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import express, { Application, Request, Response } from "express";
import { connect } from "http2";
const app = express();


const  getTime = (start:Date ,end:Date) =>{
  const s_time = new Date(start);
  const e_time = new Date(end);

  // Calculate time difference in milliseconds
  const delta = e_time.getTime() - s_time.getTime();

  // Convert milliseconds to minutes and round to 4 decimal places
  const result = Math.round((delta / 60000) * 10000) / 10000;

  return result;
}

const calculatePrice = (cost:number ,m: number) => {
   // 5 dollar$ 
  const hour_rate = m / 60;
  return cost * hour_rate; // price
};

type booking = {
  startTime: Date;
  endTime: Date;
  userId: number
  parkingLotId: number ;
  
};

export default function (app:Application){

  app.post("/booking", async (req: Request, res: Response) => {
    const { startTime, endTime, userId, parkingLotId }:booking = req.body;
    const parkinglot_id = await prisma.parkinglot.findUnique({
      where: { id: parkingLotId },
    });
    const user_id = await prisma.user.findFirstOrThrow({
      where: { id:userId },
    });

    const find_time = getTime(startTime, endTime);
    const find_price = calculatePrice(parkinglot_id!.hourlyRate, find_time);
    const total_cost = find_price * (1 + 0.15);
    if (user_id) {
      console.log("User found:", user_id);
    } else {
      console.log("User not found");
    }
    const book = await prisma.booking.create({
      data: {
        startTime: startTime,
        endTime: endTime,
        price: find_price,
        totalPrice: total_cost,
        user: { connect: { id: user_id?.id } },
        parkinglot: { connect: { id: parkinglot_id?.id } },
      },
      include: {
        user: true,
        parkinglot: { include: { vehicletype: true } },
      },
    });
     
   
    if (!book) {
      res.status(400).json({ error: "failed to create book " });
    }
    console.log("userid", user_id, userId)
    res.json(book);
  });

}