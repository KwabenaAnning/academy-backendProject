const { addUser, findUserByEmail , updateTestScores, updateTaken, fetchAllUsers} = require('../queries/users');
const { runQuery } = require('../config/database.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index')


/**
 * Create new user
 */
const createUser = async (body) => {
    const { firstName, lastName,phoneNumber, email ,password, confirmPassword } = body

    if (password !== confirmPassword) {
        return {
            code: 400,
            status: 'error',
            message: 'Password does not match',
            data: null
        }
    }
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

    // Encrypt password
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [firstName, lastName, phoneNumber, email, hash, "user"])

    return {
        code: 201,
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
    const { password: dbPassword, role, firstName, lastName, id } = user[0];
    const userPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!userPassword) {
        throw {
            code: 400,
            status: 'error',
            message: 'Wrong email and or password ',
            data: null
        }
    }

    const options = {
        'expiresIn': '1d'
    }

    // Generate token for authentication purposes
    const token = jwt.sign({
        id,
        firstName,
        lastName,
        email,
        role
    }, config.JWT_SECRET_KEY, options);
    return {
        status: 'success',
        message: 'User login successfully',
        code: 200,
        data: {
            id,
            firstName,
            lastName,
            email,
            role,
            token
        }
    }
}

const updateMyTaken = async (id) => {
 
    const updated_at = new Date();
    const result = await runQuery(updateTaken, [id]);
    console.log(result)
    // const result = await runQuery(updateTaken, [updated_at, id]);
    if (result.rowCount === 1) {
        return {
            code: 201,
            status: 'success',
            message: 'User assessment taken status updated successfully',
            data: result
        };
    } else {
        return {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        };
    }
};



// Update user's test scores
const updateMyTestScores = async (id) => {
    const updated_at = new Date();
    const results = await runQuery(updateTestScores, [ id]);
    if (results.rowCount === 1) {
        return {
            code: 201,
            status: 'success',
            message: 'User score updated successfully',
            data: results
        };
    } else {
        return {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        };
    }
};

// Get all users
const getAllUsers = async () => {
    const data = await runQuery(fetchAllUsers);
    return {
        code: 201,
        status: 'success',
        message: 'Users fetched successfully',
        data: data
    };
};


module.exports = {
    createUser,
    loginUser,
    updateMyTaken,
    updateMyTestScores,
    getAllUsers,
}