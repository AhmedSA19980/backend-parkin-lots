import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import  sinonChai from "sinon-chai";
import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import remove_user from "../../back-end/user/delete";
import { Context } from "vm";



chai.use(chaiHttp);
const expect = chai.expect;


describe("POST /remove_user",  function ()  {
 
  let prismaStub: any;
  let prismaInstance= new PrismaClient();;
  let app: Application;

  beforeEach(() => {
    try {
      console.log("beforeEach is starting ");
      prismaInstance = new PrismaClient();


      console.log("beforeEach is finished ");
      app = express();
      app.use(express.json());
      remove_user(app);

      prismaStub = sinon.stub(prismaInstance.user, "findUnique");
      sinon.stub(prismaInstance.user, "update");
    
    
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

   it("should delete a user", async function() {
  
    
    const user = {
       
       email: "john.doe@gmail.com",
     };

     prismaStub.resolves(user);
     const res = await chai.request(app).post("/delete_user").send(user);
       expect(res.status).to.equal(200) ;
       expect(res.body.userInfoSetToDelete.isuserdeleted).to.equal(true);
  
 });


  // Add more tests for validation errors...

  it("should return user id not valid (user not found)", async () => {
   
        const falseUser = {
          id: 1099999994232,
          name: "Jhon Doe",
          email: "john188349589345.doe@gmail.com",
          password: "password",
          isuserdeleted: true,
        };
        prismaStub.resolves(falseUser);


        const res = await chai
          .request(app)
          .post("/delete_user")
          .send( falseUser);

        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ message: "user not found" });

  });
});



      /*prismaStub = sinon.stub(prismaInstance.user, "findUnique").resolves({
        id: 99,
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "password",
        isuserdeleted: true,
      });

      sinon.stub(prismaInstance.user, "update").resolves({
        isuserdeleted:{
        id: 99,
        name: "John Doe",
        email: "john.doe@gmail.com",
        password:"password",
        isuserdeleted: true,
        }

      });
*/