import { PrismaClient } from "@prisma/client";
import request from "supertest";
import express from "express";
import update_user from "../../back-end/user/update";

const app = express();

app.use(express.json());
update_user(app);


// Mock the Prisma client
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  })),
}));


const prisma = new PrismaClient();


describe ("update/user",()=>{
    
    it("it must update existing user", async () => {
      const mockUser = {
        email: "five@gmail.com",
        name: "Alicefive1",
        passowrd: "password999",
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

     (prisma.user.update as jest.Mock).mockResolvedValue({
       email: "five@gmail.com",
       name: "Alicefive2",
       passowrd: "password9999",
     });

      const updateUserRes = await request(app).post("/update_user").send({
        email: mockUser.email,
        name: "Alicefive2",
        passowrd: "password9999",
      });
      expect(updateUserRes.status).toEqual(200);
      expect(updateUserRes.body.name).toEqual(updateUserRes.body.name);
      expect(updateUserRes.body.password).toEqual(updateUserRes.body.passowrd);
    });


    it ("return error if user not exist " , async()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
        const updateUserRes = await request(app).post("/update_user").send({
          email: "notfuound@example",
          //password: "updatepassword333",
        });
        expect(updateUserRes.status).toEqual(200);
        expect(updateUserRes.body).toEqual(
          "user not found! create user account"
        );

    });
    

})