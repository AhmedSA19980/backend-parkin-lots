import { parkinglot, Prisma, PrismaClient,user } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Application, Request, Response } from "express";
const app = express();


export default function (app:Application){
    app.get("/reservartiondetail", async (req: Request, res: Response) => {
    const { bookId } = req.body;
    const book_card = await prisma.booking.findUnique({
        where: {
        id: bookId,
        },
        include: {
        user:{select:
            {id:true , 
                name:true, 
                email:true, 
                isuserdeleted:true
            }},
        },
        
    });
    if (book_card?.id) {
           
            return res.status(200).json({ book: book_card });

    }
     return res.status(400).json({ erorr: "reserveration is not found" });
    });
   
}


//* find all user booking 
/*** const book_card = await prisma.user.findUnique({
        where: {
        id: bookId,
        },
        include: {
        booking: { include: { parkinglot: { include: { vehicletype: true } } } },
        },
    }); */