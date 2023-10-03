import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express.Router();
const prisma = new PrismaClient();



export default function(app:Application){

    app.post("/remove_lot" , async(req:Request ,res:Response)=>{
      const { id } = req.body;
      // Delete the user with the specified ID

      const deletePark = await prisma.parkinglot.update({
        where: { id: id },
        data: { isParkDeleted: true },
      });

      if (!deletePark){
        res.status(400).json({message:"lot is not found"})
      }else {
        res.status(200).json({islotDeleted:deletePark})
      }

    })
}