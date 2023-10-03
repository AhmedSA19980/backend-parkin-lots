import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express.Router()
const prisma = new PrismaClient();




app.put("/parkinglots/:id", async (req, res) => {
  const { id } = req.params;
  const { location, capacity, hourlyRate } = req.body;
  const parkinglot = await prisma.parkinglot.update({
    where: { id: parseInt(id) },
    data: {
      location,
      capacity,
      hourlyRate,
    },
    include: {
      vehicletype: true,
    },
  });
  res.json(parkinglot);
});

app.delete("/parkinglots/:id", async (req, res) => {
  const { id } = req.params;
  const parkinglot = await prisma.parkinglot.delete({
    where: { id: parseInt(id) },
  });
  res.json(parkinglot);
});
