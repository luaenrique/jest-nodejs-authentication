const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');


describe("Authentication", () => {
   it("should authenticate with valid credentials", async() => {
       const user = await User.create({
            name: "Luã Enrique",
            email: "lua.enrique@gmail.com",
            password_hash: "12312312",
       });

       const response = await request(app)
       .post('/sessions')
       .send({
           email: user.email,
           password: '12312321213123123123'
       })

       expect(response.status).toBe(200);
   }) 
});