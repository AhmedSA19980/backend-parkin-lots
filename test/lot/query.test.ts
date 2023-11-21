// Import the necessary modules
import * as chai from "chai";

import request from "supertest";
import express, { Application } from "express";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import query_lot from "../../back-end/lots/query"; // replace with the path to your route file

// Create an instance of your Express application
const app: Application = express();
app.use(express.json());
query_lot(app);


// Create a Sinon stub for prisma.parkinglot.findFirst
const prisma = new PrismaClient();
const findFirstStub = sinon.stub(prisma.parkinglot, "findUnique");
const expect = chai.expect;

describe("GET /get_parkinglot", () => {


  let prismaStub: any;

  let prismaInstance: any;
  let app: Application;

  beforeEach(() => {
    try {
      console.log("beforeEach is starting ");
      prismaInstance = new PrismaClient();
      prismaStub = sinon.stub(prismaInstance.parkinglot, "findUnique");
      console.log("beforeEach is finished ");
      app = express();
      app.use(express.json());
      query_lot(app);
    } catch (err) {
      console.log("Error is", err);
    }
  });

  afterEach(() => {
    try {
      console.log("afterEach is starting");
      prismaStub.restore();
      console.log("afterEach is finished");
    } catch (err) {
      console.log("Erorr after each", err);
    }
  });








  it("should return 200 and the parking lot if it exists", async () => {
    const mockParkingLot = {
      id: 39,
      location: "mEcca ,Al ksa",
      capacity: 4,
      capacityUsed: 0,
      hourlyRate: 16,
      vehicletype: [],
      isParkDeleted: false,
      booking: [
      {
       "capacityUsedDecremented": true,
            endTime: "2023-10-03T18:55:00.000Z",
            id: 318,
            isBookedCompeleted: true,
            parkingLotId: 39,
            price: 1.333333333333333,
            startTime: "2023-10-03T18:50:00.000Z",
            totalPrice: 1.533333333333333,
            userId: 1,
          },
          {
            capacityUsedDecremented: true,
            endTime: "2023-10-03T18:55:00.000Z",
            id: 319,
            isBookedCompeleted: true,
            parkingLotId: 39,
            price: 1.333333333333333,
            startTime: "2023-10-03T18:50:00.000Z",
            totalPrice: 1.533333333333333,
            userId: 1,
          },
          {
            capacityUsedDecremented: true,
            endTime: "2023-10-11T11:55:00.000Z",
            id: 320,
            isBookedCompeleted: true,
            parkingLotId: 39,
            price: 1.333333333333333,
            startTime: "2023-10-11T11:50:00.000Z",
            totalPrice: 1.533333333333333,
            userId: 1,
          }
        ]

    };
    // Set the stub to return a parking lot
    findFirstStub.resolves(mockParkingLot);

    const res = await request(app)
      .get("/get_parkinglot")
      .send({ id: mockParkingLot.id });

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockParkingLot);
    expect(res.body.id).to.equal(mockParkingLot.id);
    expect(res.body.capacity).to.equal(mockParkingLot.capacity);
    expect(res.body.capacityUsed).to.equal(mockParkingLot.capacityUsed);
    expect(res.body.hourlyRate).to.equal(mockParkingLot.hourlyRate);
    expect(res.body.isParkDeleted).to.equal(mockParkingLot.isParkDeleted);
  });

  it("should return 400 if the parking lot does not exist", async () => {
    // Set the stub to return null
    findFirstStub.resolves(null);

    const res = await request(app).get("/get_parkinglot").send({ id: 99999 });

     expect(res.status).to.equal(400)

  });
});
