import chai from "chai";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import express from "express";
import request from "supertest";
import add_user from "../../back-end/user/adduser";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const expect = chai.expect;
const app = express();
app.use(express.json());
add_user(app);

describe("POST /parkinglots", () => {
  let prismaStub: any;
  let prismaInstance: any;

  beforeEach(async () => {
    try {
      console.log("beforeEach is starting");
      prismaInstance = new PrismaClient();
      // console.log("property", prismaInstance.parkinglot);
      prismaStub = sinon.stub(prismaInstance.user, "create");
      console.log("beforeEach has finished");
    } catch (error) {
      console.error("Error in beforeEach:", error);
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

  //console.log(`${prismaStub}`);
  it("should create a user", async () => {
    
   
        const password = faker.internet.password();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = {
          id: 289,
          name: `${faker.person.firstName()} ${faker.person.lastName()}`,
          email: faker.internet.email(),
          isuserdeleted:false,
          password: hash,
        };

        prismaStub.resolves(user);
        console.log(prismaStub); // Should log a Sinon stub
        console.log(prismaStub.create);

        const res = await request(app).post("/create_user").send(user);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(user);
        sinon.spy(prismaStub.update);
        sinon.assert.calledWith(prismaStub.create, {
          data: user,
        });
   
    
    /**/
  });

  // Add more tests for validation errors...
});
