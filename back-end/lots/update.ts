import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express.Router();
const prisma = new PrismaClient();


type Ulots = {
  location: string;
  capacity: number;
  hourlyRate: number;
};

// we need to specify if auth ,so only manager can update 
export default function (app: Application) {
  app.post("/update_parkinglots", async (req, res) => {
    const { location, capacity, hourlyRate }: Ulots = req.body;
    const parkinglot = await prisma.parkinglot.update({
      where:{
        id:req.body // mamanger must update 
      },
      data: {
        location: location,
        capacity: capacity,
        hourlyRate: hourlyRate,
      },
      include: {
        vehicletype: true,
      },
    });

    res.json(parkinglot);
  });
}
