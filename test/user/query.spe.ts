import chai from "chai";
import sinon from "sinon";
import { Application, Request, Response } from "express";
import user from "../../back-end/user/query";

const expect = chai.expect;

describe("user crud", () => {
  let app: Application;
  let prisma: any;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    app = { get: sinon.stub() } as any;
    prisma = {
      user: {
        findFirstOrThrow: sinon.stub(),
      },
    };
    req = { body: {} } as any;
    res = { json: sinon.spy() } as any;
    user(app);
  });

  it("should return the user with the given id", async () => {
    const userId = "1";
    const userData = {
      id: userId,
      name: "second",
      email: "afasd@gmail.com",
      password: "a98765",
      isuserdeleted: false,
    };
    req.body = userId;
    prisma.user.findFirstOrThrow.resolves([userData]);

    const getCallback = (app.get as sinon.SinonStub).args[0][1];
    await getCallback(req, res);

    expect(prisma.user.findFirstOrThrow.calledWith({ where: { id: userId } }))
      .to.be.true;
    expect((res.json as sinon.SinonSpy).calledWith([userData])).to.be.true;
  });
});
