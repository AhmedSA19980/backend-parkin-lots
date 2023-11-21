import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import update_lot from "../../back-end/lots/update";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /update_lot", () => {
  let prismaStub: any;

  let prismaInstance: any;
  let app: Application;

  beforeEach(() => {
    try {
      console.log("beforeEach is starting ");
      prismaInstance = new PrismaClient();
      prismaStub = sinon.stub(prismaInstance.parkinglot, "update");
      console.log("beforeEach is finished ");
      app = express();
      app.use(express.json());
      update_lot(app);
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

  it("should update a parking lot", async () => {
    const lot = {
      id: 76,
      location: "update delete location",
      capacity: 0,
      capacityUsed: 0,
      hourlyRate: 10.3,
      isParkDeleted: false,
      vehicletype: [],
    };

    prismaStub.resolves(lot);

    const res = await chai
      .request(app)
      .post("/update_parkinglots")
      .send( lot);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(  lot );

    /*sinon.assert.calledWith(prismaStub.update,{
      where: { id: lot.id },
      data: { isParkDeleted: true },
    });*/
  });
  
  it ("should return id message error of parking lots", async() =>{

     const lot = {
       id: 76098900099,
       location: "update delete location",
       capacity: 0,
       capacityUsed: 0,
       hourlyRate: 10.3,
       isParkDeleted: false,
       vehicletype: [],
     };
     prismaStub.resolves(lot);
     const res  = await chai.request(app).post("/update_parkinglots").send(lot)
     
     expect(res.status).to.equal(400);
     expect(res.body).to.deep.equal({Error:"parking lot not found"})

    });

  // Add more tests for validation errors...


});
