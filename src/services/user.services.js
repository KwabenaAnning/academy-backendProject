const { createUser, findUserByEmail } = require('../queries/user');
const { runQuery } = require('../config/database.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index')


/**
 * Create new user
 */
const addUser = async (body) => {
    const { firstname, lastname, email, phone_number, password } = body
    // Check if user already exist in db
    const userExist = await runQuery(findUserByEmail, [email])
    if (userExist.length > 0) {
        throw {
            code: 409,
            message: 'User already exists',
            data: null,
            status: 'error'
        }
    }




/**
* Encrypt password
*/

    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(createUser, [ firstname, lastname, email, phone_number, hash])

    return {
        code: 200,
        status: 'success',
        message: 'New user added successfully',
        data: response[0]
    }
}

const loginUser = async (body) => {
    const { email, password } = body;

    // Check if that user exists inside the db
    const user = await runQuery(findUserByEmail, [email]);
    if (user.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        }
    }
    // Compare user passwords
    const { password: dbPassword, firstname, id } = user[0];
    console.log(user[0])
    const userPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!userPassword) {
        throw {
            code: 400,
            status: 'error',
            message: 'Wrong email and password combination',
            data: null
        }
    }

    const options = {
        'expiresIn': '1d'
    }

    // Generate token for authentication purposes
    const token = jwt.sign({
        id,
        firstname,
        email,
    }, config.JWT_SECRET_KEY, options);
    return {
        status: 'success',
        message: 'User login successfully',
        code: 200,
        data: {
            id,
            firstname,
            email,
            token
        }
    }
}

module.exports = {
    addUser,
    loginUser
}


