const UserService = require('../services/user.service');

/**
 * Controller creating a new user
  @param {} req 
  @param {} res 
  @param {} next 
 * @returns JSON object as response data
 */
const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}

/**
 * Controller for login user
  @param {} req 
  @param {} res 
  @param {} next 
 * @returns 
 */
const signInUser = async (req, res, next) => {
    try {
        const result = await UserService.loginUser(req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        next(error)
    }
}


/** 
@param {} req 
@param {} res 
@param {} next 
* @returns 
*/
const updatetheTaken = async (req, res, next) => {
  try {
      const { user_id } = req.params.id
      const result = await UserService.updateMyTaken(user_id);
      return res.status(result.code).json(result)
  } catch (error) {
      next(error)
  }
}

/**
* 
@param {} req 
@param {} res 
@param {} next 
* @returns 
*/
const updateTheTestScores = async (req, res, next) => {
  try {
    const { user_id } = req.params.id
      const result = await UserService.updateMyTestScores(user_id);
      return res.status(result.code).json(result)
  } catch (error) {
      next(error)
  }
}

const grabAllUsers = async (req, res, next) => {
    try {
        const result = await UserService.getAllUsers(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    signInUser,
    updatetheTaken,
    updateTheTestScores,
    grabAllUsers
}



