import { parkinglot, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Request, Response } from "express";
const app = express();


app.get("/booked" ,async(req:Request ,res:Response)=>{
    const {bookId} =req.body
    const book_card = await prisma.user.findUnique({
        where:{
            id:bookId
        },
        include:{
            booking:{include:
                {parkinglot:
                    {include:{vehicletype:true}}}},
        }
    })
    if(!book_card){
      return res.status(400).json({erorr:"reserveration is not found"})
    }
    return res.status(200).json({book:book_card})
})


app.delete("/booking:id", async (req: Request, res: Response) => {
  const {bookId } = req.params;
  
  const book = await prisma.booking.delete({
    where:{id:parseInt(bookId)},
  });
  if (!book) {
    res.status(500).json({ error: "failed to create book " });
  }
  res.json({msg:"ticket card is canceled successfully"});
});