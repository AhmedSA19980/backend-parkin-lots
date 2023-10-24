import { PrismaClient } from "@prisma/client";
import express, { Application, Request, Response } from "express";

//const app = express.Router();
const prisma = new PrismaClient();

type User = {
 
  email:string
}


export default function(app:Application ,args?:any){
  app.post("/delete_user", async (req: Request, res: Response) => {
    const {  email }: User = req.body;


    const findUser  = await prisma.user.findUnique({
      where:{email:email }
    })
    if (findUser?.email) {
      // Delete the user with the specified ID
      const deletedUser = await prisma.user.update({
        where: {

          email: email,
        },
        data: { isuserdeleted: true }, // this field doesn't show up
      });
      return res.status(200).json({ isUserDeleted: deletedUser });
    } else {
        res.status(400).json({ message: "user not found" });       

    }
  });
}  

