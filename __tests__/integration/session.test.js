const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe("Authentication", () => {
    beforeEach(async () => {
        await truncate();
    });


   it("should authenticate with valid credentials", async() => {
       const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password: "1234",
       });

       const response = await request(app)
       .post('/sessions')
       .send({
           email: user.email,
           password: '1234'
       })

       expect(response.status).toBe(200);
   }) 

   it("should have a registered email to authenticate", async() => {
        const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password: "1234",
        });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: "asdasd@gmail.com",
            password: '1234'
        })

        expect(response.status).toBe(401);
    }) 

   it("should not authenticate with invalid credentials", async() => {
        const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password: "1234",
        });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '4321'
        })

        expect(response.status).toBe(401);
    }) 

    it("should return jwt token when authenticated", async() => {
        const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password: "1234",
        });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: "lua.enrique@gmail.com",
            password: '1234'
        })

        expect(response.body).toHaveProperty("token");
    }) 

    it("should be able to access private routes when authenticated", async () => {
        const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password: "1234",
        });
    
        const response = await request(app)
          .get("/dashboard")
          .set("Authorization", `Bearer ${user.generateToken()}`);
    
        expect(response.status).toBe(200);
      });

    it("should not be able to access private routes without jwt token", async () => {
        const response = await request(app).get("/dashboard");

        expect(response.status).toBe(401);
    });

    it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
        .get("/dashboard")
        .set("Authorization", `Bearer 123123`);

        expect(response.status).toBe(401);
    });

});