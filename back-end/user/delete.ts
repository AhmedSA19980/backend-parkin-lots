import { PrismaClient } from "@prisma/client";
import express, { Application, Request, Response } from "express";
const app = express.Router();
const prisma = new PrismaClient();


export default function(app:Application){
app.delete("/users/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  // Delete the user with the specified ID
  const deletedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { isuserdeleted: true }, // this field doesn't show up
  });

  res.json(deletedUser);
});

}

