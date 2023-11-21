import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import remove_lot from "../../back-end/lots/delete";


const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /remove_lot", () => {
 
  let prismaStub:any ; // update
  let prismaStub2: any; //query 
  let prismaInstance: any;
  let app: Application;

  beforeEach(() => {
    try {
    console.log("beforeEach is starting ")
    prismaInstance = new PrismaClient();
    prismaStub2 = sinon.stub(prismaInstance.parkinglot , "findUnique");
    prismaStub = sinon.stub(prismaInstance.parkinglot, "update");
    console.log("beforeEach is finished ");
    app = express();
    app.use(express.json());
    remove_lot(app);

    }catch(err){
        console.log("Error is" , err)
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

  it("should remove a parking lot", async () => {
    
   
        const lot = {
          id: 77,
          capacity: 100,
          location: "update Test Location",
          capacityUsed: 50,
          hourlyRate: 10,
          isParkDeleted: true,
        };

        prismaStub.resolves(lot);

        const res = await chai
          .request(app)
          .post("/remove_lot")
          .send({ id: lot.id });

        expect(res.status).to.equal(200);
        expect(res.body.islotDeleted.isParkDeleted).to.deep.equal(true);

        /*sinon.assert.calledWith(prismaStub.update,{
      where: { id: lot.id },
      data: { isParkDeleted: true },
    });*/
  
    
  
    
  });

  // Add more tests for validation errors...
 
  it("should return parking lot id not valid (lot is not found)", async () => {
    // Stub the prisma.parkinglot.update method to resolve with null (indicating the lot is not found)
    prismaStub.resolves(null);

    // Make a request to the /remove_lot endpoint with an invalid lot ID
    const res = await chai.request(app).post("/remove_lot").send({ id: 777 });

    // Assert that the response has a status code of 400 and the body matches the expected message
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: "lot is not found" });
  });
 


});
