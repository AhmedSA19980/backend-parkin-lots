import { PrismaClient } from "@prisma/client";
import express, { Application,Request, Response } from "express";
const app = express.Router();
const prisma = new PrismaClient();
import bcrypt from "bcrypt"


//note if we want to query relationship we need include
  //https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql
  //update pusblish before update on the same page



export default function (app:Application , args?:any ){
  app.post("/user", async (req: Request, res: Response) => {
    const  {name, email, password } =req.body;
    const salt  = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password , salt)

    const user = await prisma.user.create({
      data: {
        name:name,
        email:email,
        password:hash,
      },
    });
    const allUsers = await prisma.user.findMany();
    
    console.log(allUsers);
    res.json(user);
  });
}

