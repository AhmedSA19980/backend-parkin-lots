import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Application, Request, Response } from "express";



export default function(app:Application){
    app.get("/users" , async(req:Request, res:Response)=>{
        const query_all_users  =  await prisma.user.findMany({
            select:{
               // password:false,
                name:true,
                email:true,
                isuserdeleted:true,
            }
        })
        
        return res.status(200).json({users:query_all_users})

    })
}


async function excludePasswordMiddleware(params:any, next:any) {
  const result = await next(params);
  if (params?.model === "User" && params?.args?.select?.password !== true) {
    delete result.password;
  }
  return result;
}

prisma.$use(excludePasswordMiddleware);