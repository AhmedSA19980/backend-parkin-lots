import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express.Router();
const prisma = new PrismaClient();




export default function (app: Application) {
  app.get("/get_parkinglot:id", async (req:Request, res:Response) => {
    const { id } = req.body;
    const parkinglot = await prisma.parkinglot.findFirst({
     where:{
        id:id,
        //location:location,
        //capacity:capacity,
        //hourlyRate:hourlyRate
     },
      include: {
        booking:true,
        vehicletype: true,
      },
    });
    if (!parkinglot){
      return res.status(400).json({error:"parking lot isn't exist"})
    }
    res.json(parkinglot);
  });
}