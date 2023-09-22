const { addUser, loginUser } = require('../services/user.services');



/**
 * Create an Account
 * 
 * @param {*request} req 
 * @param {*result} res 
 * @param {*object} next 
 * @returns 
 */


const createUser = async (req, res, next) => {
  try {
    const response = await addUser(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};





/**
 * Log in user
 * 
 * @param {request} req 
 * @param {result} res 
 * @param {object} next 
 * @returns 
 */ 

const signInUser = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};









module.exports = {
   createUser,
   signInUser,
};