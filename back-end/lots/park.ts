import express, { Application,Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express.Router();
const prisma = new PrismaClient();


type lots = {
  location: string;
  capacity: number;
  hourlyRate: number;
  capacityUsed:number;

};

export default function(app:Application){
   
  app.post("/parkinglots", async (req, res) => {
      const { location, capacity, hourlyRate, capacityUsed }:lots = req.body;
      const parkinglot = await prisma.parkinglot.create({
        data: {
          location: location,
          capacity: capacity,
          capacityUsed:capacityUsed,
          hourlyRate: hourlyRate,

        },
        include: {
          vehicletype: true,
        },
      });

      res.json(parkinglot)
  })
}