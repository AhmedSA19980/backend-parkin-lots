import express, { Application,Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { FieldValidation } from "../lib/lotvalidation";
const app = express.Router();
const prisma = new PrismaClient();


type lots = {
  location: string;
  capacity: number;
  hourlyRate: number;
  capacityUsed:number;

};

export default function(app:Application){
   
  app.post("/parkinglots", async (req:Request, res:Response) => {
      const { location, capacity, hourlyRate, capacityUsed }:lots = req.body;
      
      const capacityValidation = FieldValidation(capacity)
      const locationValidation = FieldValidation(location)

      if (capacityValidation.intgerFieldError ) {
        res.status(400).json({ err: capacityValidation.intgerFieldError });
      }
      else if(locationValidation.stringFieldError){
        res.status(400).json({ err: locationValidation.stringFieldError });
      }else{
     
       const parkinglot = await prisma.parkinglot.create({
         data: {
           location: location,
           capacity: capacity,
           capacityUsed: capacityUsed,
           hourlyRate: hourlyRate,
         },
         include: {
           vehicletype: true,
         },
       });
        res.status(200).json(parkinglot);
      }
  })
}