


import chai from "chai";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import express from "express";
import request from "supertest";
import add_parkinglot from "../../back-end/lots/park";
//import { json } from "stream/consumers";
//import { stringify } from "ts-jest";

const expect = chai.expect;
const app = express();
app.use(express.json());
add_parkinglot(app);

describe("POST /parkinglots", () => {
  let prismaStub: any;
  let prismaInstance: any;

   beforeEach(async () => {
     try {
       console.log("beforeEach is starting");
       prismaInstance = new PrismaClient();
      // console.log("property", prismaInstance.parkinglot);
       prismaStub = sinon.stub(prismaInstance.parkinglot, "create");
       console.log("beforeEach has finished");
     } catch (error) {
       console.error("Error in beforeEach:", error);
     }
   });

   
  afterEach(() => {
    try{
    console.log("afterEach is starting");
    prismaStub.restore();
    console.log("afterEach is finished");
    }catch(err){
        console.log("Erorr after each", err)
    }
  });

  //console.log(`${prismaStub}`);
  it("should create a parking lot", async () => {
    const lot = {
      id: 76,
      location: "Test Location",
      capacity: 100,
      hourlyRate: 10,
      capacityUsed: 50,
      vehicletype: [],
      isParkDeleted: false,
    };

    prismaStub.resolves(lot);
    console.log(prismaStub); // Should log a Sinon stub
    console.log(prismaStub.create); 

    const res = await request(app).post("/parkinglots").send(lot);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(lot);
    sinon.spy(prismaStub.update)
    sinon.assert.calledWith(prismaStub.create, {
      data: lot,
      include: { vehicletype: true },
    });
  });

  // Add more tests for validation errors...
});
