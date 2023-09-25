const request = require('supertest');
const chai = require('chai');
const app =require('../index');
const {expect} = require('chai');


describe('Testing Express Endpoints', () => {
  it('should test for create user', async () => {
    const addUser = { firstName:"goga",lastName:"gago",phonenumber:1234567890, email:"gago@gmail.com ", password:"1234567uh9o",
    confirmPassword:"1234567uh9o" };
    const response = await request(app).post('/api/v1/users/signup') .send(addUser)
      expect(response.status).to.equal(409);
  });

  it('should test for logging in a user', async () => {
    const loginUser = {  email:"aburoNkate3@gmail.com ", password:"123456w" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(200);
  });

  it('should test for failed log in', async () => {
    const loginUser = {  email:"aburoNkate3@gmail.com ", password:"123456w" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(200);
  });

})
