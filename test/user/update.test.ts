
import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import update_user from "../../back-end/user/update";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /update_existing user", () => {
  let prismaStub: any;
  let prismaInstance: any;
  let app: Application;


  beforeEach(() => {
    try {
       console.log("beforeEach is starting ");
        prismaInstance = new PrismaClient();
       prismaStub = sinon.stub(prismaInstance.user, "findUnique").resolves({
         email: "john2.doe@gmail.com",
         name: "John2 Doe",
         password: "password",
       });

       sinon.stub(prismaInstance.user, "update").resolves({
         email: "john2.doe@gmail.com",
         name: "Jhon22 Doe",
         password: "password",
       });

      console.log("beforeEach is finished ");
      app = express();
      app.use(express.json());
      update_user(app);
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

  it("should update a user", async () => {
    
    const userAfterUpdate = {
      id: 105,
      isuserdeleted: false,
      email: "john2.doe@gmail.com",
      name: "Jhon22 Doe",
      password: "password",
    };

 

    prismaStub.resolves(userAfterUpdate);

    const res = await chai
      .request(app)
      .post("/update_user")
      .send(userAfterUpdate);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(userAfterUpdate);

    /*sinon.assert.calledWith(prismaStub.update, {
      where: { id: userAfterUpdate.id },
      data: userAfterUpdate,
    });*/
  });

  it("should return error message when user id not found !", async () => {
    const user = {
      email:""
    };
    prismaStub.resolves(user);
    const res = await chai.request(app).post("/update_user").send(user);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({error:"user not found! create user account"});
  });

  // Add more tests for validation errors...
});

    
