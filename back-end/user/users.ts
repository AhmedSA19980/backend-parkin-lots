import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Application, Request, Response } from "express";



export default function(app:Application){
    app.get("/users" , async(req:Request, res:Response)=>{
        const query_all_users = await prisma.user.findMany({
          select: {
            //password:true, //pass is hashed
            id: true,
            name: true,
            email: true,
            isuserdeleted: true,
          },
        });
        
        return res.status(200).json({users:query_all_users})

    })
}
<<<<<<< HEAD
=======

>>>>>>> master
