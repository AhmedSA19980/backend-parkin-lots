import  express from "express"
import session from "express-session";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);