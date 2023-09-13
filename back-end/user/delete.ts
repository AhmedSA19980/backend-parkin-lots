import { PrismaClient } from "@prisma/client";
import express, { Application, Request, Response } from "express";

//const app = express.Router();
const prisma = new PrismaClient();

type User = {
  userId: number
  email:string
}


export default function(app:Application ,args?:any){
  app.post("/delete_user", async (req: Request, res: Response) => {
    const { userId, email }: User = req.body;

    // Delete the user with the specified ID
    const deletedUser = await prisma.user.update({
      where: {
        id: userId,
        email:email
      },
      data: { isuserdeleted: true }, // this field doesn't show up
    });
    if (!deletedUser) {
      res.status(400).json({ message: "user not found" });
    } else {
      return res.status(200).json({ isUserDeleted: deletedUser });
    }
  });
  

