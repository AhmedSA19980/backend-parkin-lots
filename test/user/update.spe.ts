import chai, { expect } from "chai";
import sinon from "sinon";
import { Application, Request, Response } from "express";
import update_user from "../../back-end/user/user";



describe ("update user" ,()=>{
    let app: Application;
    let prisma: any;
    let req: Request;
    let res: Response;
    
    beforeEach(()=>{
        app = {post: sinon.stub()} as any;
        prisma =  {
            user :{
                update:sinon.stub(),
                findUnique: sinon.stub(),
            },
        };
        req  = {body: { name: "alice Morgan", email: "alice@gamil.com", password: "password123" }} as any;
        res  = { json : sinon.spy() } as any;
        update_user(app, prisma)
    })

    it("should update existing user ", async()=>{
        const findUserByEmail = "alice@gmail.com"
        const updateUserData = {
          email: findUserByEmail,
          name: "Alice",
          password:"pass123"
        };
        req.body  = updateUserData;
        prisma.user.update.resolves(updateUserData)
        prisma.user.findUnique.resolves({...updateUserData , name:req.body.name , password:req.body.password})


        const postCallback = (app.post as sinon.SinonSpy).args[0][1]
        await postCallback(req , res)

        expect(prisma.update_user.findUnique.calledWith({where:{email:req.body.email}})).to.be.true;
        expect(
          prisma.update_user.update.calledWith({
            where: { email: req.body.email },
            data:{name:req.body.name  ,password:req.body.password}
          })
        ).to.be.true;
        expect((res.json as sinon.SinonSpy).calledWith({
            where: { email: req.body.email },
            data:{name:req.body.name  ,password:req.body.password}
          })).to.be.true;


    })

})