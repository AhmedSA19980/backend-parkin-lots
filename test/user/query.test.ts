
import * as chai from "chai";
import request from "supertest";
import express, { Application } from "express";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import query_user from "../../back-end/user/query"; // replace with the path to your route file

const expect = chai.expect;

describe("GET /user", () => {
  let prismaStub: any;
  let prismaInstance: any;
  let app: Application;

  beforeEach(() => {
    prismaInstance = new PrismaClient();
    prismaStub = sinon.stub(prismaInstance.user, "findFirstOrThrow");
    app = express();
    app.use(express.json());
    query_user(app);
  });

  afterEach(() => {
    prismaStub.restore();
  });

  it("should return user info", async () => {
    const user = {
      id: 2,
      name: "secondUser",
      email: "new2@gmail.com",
      isuserdeleted: false,
    };

    prismaStub.resolves(user);

    const res = await request(app).get("/user").send({ id: user.id });

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(user);
  });

  it("should return 400 if user not found", async () => {
    prismaStub.throws(new Error());

    const res = await request(app).get("/user").send({ id: 0 });

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ msg: "user not found" });
  });
});
