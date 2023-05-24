import { PrismaClient } from "@prisma/client";
import express, {Application ,Request, Response } from "express";
const app = express.Router();
const prisma = new PrismaClient();




export default function(app:Application){
app.post("/update_user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Find a user by their email address
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // Update a user's name
  if (!user) {
    res.json("user not found! create user account");
  } 
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: name,
        password: password,
      },
    });
    res.json(updatedUser);
    console.log(user);
});
}