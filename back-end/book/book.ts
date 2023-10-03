import {PrismaClient } from "@prisma/client";
import { book } from "../calc/calcuate";
const prisma = new PrismaClient();
import express, { Application, Request, Response } from "express";
import { updateParkingLotCapacity } from "../lib/timebooking";
import { isValidTime } from "../lib/validTime";
import Stripe from "stripe";
import PAYMENTINTENT from '../lib/pay'



const app = express();





type booking = {
  startTime: Date;
  endTime: Date;
  curT:Date;
  userId: number
  parkingLotId: number ;
  //isBookedCompeleted:false;
  capac:number;
  
  
};

export  function Book_Lot(app: Application) {
  app.post("/booking", async (req: Request, res: Response) => {
    
    const {
      startTime,
      endTime,
      userId,
      parkingLotId,
      capac,
    }: booking = req.body;
    const {paymentmethodId , customer} = req.body

    const parkinglot_id = await prisma.parkinglot.findUnique({
      where: { id: parkingLotId },
    });
    
    const user_id = await prisma.user.findFirstOrThrow({
      where: { id: userId },
    });

    let updateParkingLotCapacityUsed;
    const calc = new book();
    const find_time = calc.getTimeCheck(startTime, endTime);
    const find_price = calc.calculatePrice(
      parkinglot_id!.hourlyRate,
      find_time
    );
    const total_cost = find_price * (1 + 0.15);
    
    if (!isValidTime(startTime) && !isValidTime(endTime)) {
        return res
          .status(400)
          .json({ error: "Start time and end time must be in the future" });
    }
    if (user_id.isuserdeleted){
       return res.status(400).json({error:"user id deleted"})
    }



    if (parkinglot_id?.id) {
      if (
        parkinglot_id.capacityUsed < 0 ||
        parkinglot_id.capacityUsed >= parkinglot_id.capacity 
      )
      {return res.status(400).json({error:"no, free parking lots"})}
      
      else{    
          const book_park = await prisma.booking.create({
            data: {
              startTime: startTime,
              endTime: endTime,
              price: find_price,
              isBookedCompeleted: false,
              totalPrice: total_cost,

              user: { connect: { id: user_id?.id } },
              parkinglot: { connect: { id: parkinglot_id?.id } },
            },
            include: {
              user: true,
              parkinglot: { include: { vehicletype: true } },
            },
          });
          const paymentResult = await PAYMENTINTENT(
            Math.round(total_cost * 100),
            paymentmethodId,
            customer
          );

         if (!paymentResult.success){
            return res.status(400).json({ payment: paymentResult.error });
        
        }else {updateParkingLotCapacityUsed = await prisma.parkinglot.update({
          where: { id: parkinglot_id!.id },
          data: { capacityUsed: { increment: 1 } },
        });

        return res.status(200).json({
          parking: updateParkingLotCapacityUsed,
          book: book_park,
          paymentResult: {
            success: paymentResult.success,
            messages: paymentResult.message,
          },
        });
      }
          
      }
      
    }
    return res.status(400).json({ error: "failed to create book " });
  
    
  });
}


