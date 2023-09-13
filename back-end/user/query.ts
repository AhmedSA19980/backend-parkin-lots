import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Application,Request, Response } from "express";

const app = express();
export default function (app:Application){
app.get("/user", async (req:Request, res:Response) => {
  async function main() {
    const { id }  = req.body
    try {
      const findUserById = await prisma.user.findFirstOrThrow({
        where: { id: id },
        select:{
          name:true,
          email:true ,
          isuserdeleted:true,
          //password:true
        }
        
      });
      console.log(findUserById);
      res.json(findUserById);
    } catch (err) {
      res.status(400).json({msg:"user not found"})
      console.log(err);
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  }
 
  return main();
});
}