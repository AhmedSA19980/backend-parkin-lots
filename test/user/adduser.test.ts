import request from "supertest";
import express from "express";
import add_user from "../../back-end/user/adduser"

const app =express()

app.use(express.json());
add_user(app);


describe("POST/ USER",()=>{
  it('should craet a new user', async()=>{
    const  res = await request(app).post('/user')
    .send({name:"test user",
         email:"testexpamle1@gmail.com",
         password: 'password123'
    
        })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("email");  
   
  })  
})

