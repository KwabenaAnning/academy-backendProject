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
    const loginUser = { email:"aburonkate3@gmail.com ", password:"123456w" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(404);
  });

  it('should test for failed log in', async () => {
    const loginuser = { email:"aburonkate3@gmail.com ", password:"123456w" };
    const response = await request(app).post('/api/v1/users/login') .send(loginuser)
      expect(response.status).to.equal(404);
  });

  it('should test for applications', async () => {
    const appUser = { email:"broski@gmail.com ", password:"enyata1" };
    const response = await request(app).post('/api/v1/application/create') .send(appUser)
      expect(response.status).to.equal(400);
  });

  it('should test for assessment created by admin', async () => {
    const appAssessment = { application_batch_id:"2", imageUrl:"C:/Users/HP/Pictures/Saved/NyameAy3Bi.jpg", 
    questions:"what is the cappital of ghana: a. m, b.go, c. accra" };
    const response = await request(app).post('/api/v1/assessment/') .send(appAssessment)
      expect(response.status).to.equal(400);
  });

  it('should test for assessment taken by user', async () => {
    const appAssessmentTaken = { user_id:"2", application_id:"2", assessment_id:"7", time_spent:"30", 
       "responses":"c.Ghana" };
    const response = await request(app).post('/api/v1/assessment/take') .send(appAssessmentTaken)
      expect(response.status).to.equal(400);
  });

  it('should test for admin login', async () => {
    const Admin= { email:"enyatagroup3@gmail.com", password:"12345678901" };
    const response = await request(app).post('/api/v1/users/login') .send(Admin)
      expect(response.status).to.equal(200);
  });

})
