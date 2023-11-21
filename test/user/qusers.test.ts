import * as chai from "chai";
import request from "supertest";
import express, { Application } from "express";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import query_user from "../../back-end/user/users"; // replace with the path to your route file
import { faker } from "@faker-js/faker";;


const expect = chai.expect;

describe("GET /users", () => {
  let prismaStub: any;
  let prismaInstance: any;
  let app: Application;

  beforeEach(() => {
    prismaInstance = new PrismaClient();
    prismaStub = sinon.stub(prismaInstance.user, "findMany");
    app = express();
    app.use(express.json());
    query_user(app);
  });

  afterEach(() => {
    prismaStub.restore();
  });

  it("should return all users info", async () => {
    const users = [
      {
        id: 1,
        name: "second",
        email: "afasd@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 2,
        name: "secondUser",
        email: "new2@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 4,
        name: "secondUser",
        email: "new3@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 5,
        name: "Alice",
        email: "alice@example.com",
        isuserdeleted: true,
      },
      {
        id: 7,
        name: "Alice",
        email: "alice@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 9,
        name: "Alice",
        email: "aliceone@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 11,
        name: "Alice",
        email: "two@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 13,
        name: "Alice",
        email: "three@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 16,
        name: "Alice",
        email: "four@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 62,
        name: "Alicefive1",
        email: "five@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 79,
        name: "John Doe",
        email: "john.doe@example.com",
        isuserdeleted: false,
      },
      {
        id: 99,
        name: "John Doe",
        email: "john.doe@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 102,
        name: "John Doe",
        email: "john1.doe@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 105,
        name: "Jhon22 Doe",
        email: "john2.doe@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 106,
        name: "secondUser",
        email: "newAfterhash@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 109,
        name: "secondUser121",
        email: "newperson@gmail.com",
        isuserdeleted: false,
      },
      {
        id: 110,
        name: "test user",
        email: "testexpamle@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 112,
        name: "new user has test",
        email: "testexpamle1@gmail.com",
        isuserdeleted: true,
      },
      {
        id: 285,
        name: "Eino Harvey",
        email: "Sydni.Rippin25@yahoo.com",
        isuserdeleted: false,
      },
      {
        id: 286,
        name: "Osvaldo Parker",
        email: "Lucienne.Nitzsche@yahoo.com",
        isuserdeleted: false,
      },
      {
        id: 287,
        name: "Katrina Botsford",
        email: "Dorris_Cormier20@hotmail.com",
        isuserdeleted: false,
      },
      {
        id: 288,
        name: "Myrtis Mueller",
        email: "Franz_Hane@yahoo.com",
        isuserdeleted: false,
      },
      {
        id: 289,
        name: "Katrine Kreiger",
        email: "Cullen.Schneider65@yahoo.com",
        isuserdeleted: true,
      },
    ];
  

    prismaStub.resolves(users);

    const res = await request(app)
      .get("/users")

    expect(res.status).to.equal(200);
    
    expect(res.body).to.deep.equal({users:users});
    
    

    });
});
