const  { responseProvider }  = require('../../helper/response');
const moment = require('moment')




const verifyUserSignUpInput = (req, res, next) => {

    try {
        const { email, firstname, lastname, password, phone_number } = req.body;


        if (typeof email !== 'string' || !email.includes('@')) {
            return responseProvider( res, null, 'Provide a valid email', 400)
        }

        if (typeof firstname !== 'string' ) {
            return responseProvider( res, null, 'Provide a valid firstname', 400)
        }


        if (typeof lastname !== 'string' ) {
            return responseProvider( res, null, 'Provide a valid lastname', 400)
        }


        if (typeof password !== 'string' || password.length < 8) {
            return responseProvider( res, null, 'Provide a valid password', 400)
        }

        if (typeof phone_number !== 'number' ||  phone_number.toString().length !== 10) {
            return responseProvider( res, null, 'Provide a valid phone number', 400)
        }


        return next();
    } catch (error) {
        return next(error);
    }
};



//todo: refactor repetitive validators



const verifyApplicationInput = (req, res, next) => {

    try {

        const {
            email, firstname,
            lastname, address,
            course, university,
            cgpa, date_of_birth
        } = req.body;


        if (typeof email !== 'string' || !email.includes('@')) {
            return responseProvider( res, null, 'Provide a valid email', 400)
        }

        if (typeof firstname !== 'string' || !firstname) {
            return responseProvider( res, null, 'Provide a valid firstname', 400)
        }


        if (typeof lastname !== 'string' || !lastname) {
            return responseProvider( res, null, 'Provide a valid lastname', 400)
        }


        if (typeof address !== 'string' || !address) {
            return responseProvider( res, null, 'Provide a valid address', 400)
        }

        if (typeof course !== 'string' || !course) {
            return responseProvider( res, null, 'Provide a valid course of study', 400)
        }


        if (typeof university !== 'string' || !university) {
            return responseProvider( res, null, 'Provide a valid university name', 400)
        }

        if (typeof cgpa !== 'number') {
            return responseProvider( res, null, 'Provide a valid cgpa', 400)
        }


        if (moment(date_of_birth, 'DD/MM/YYYY', true).isValid) {
            return responseProvider( res, null, 'Provide a valid date of birth', 400)
        }


        return next();
    } catch (error) {
        return next(error);
    }
};








const verifyUserLoginInput = (req, res, next) => {

    try {
        const { email, password } = req.body;


        if (typeof email !== 'string' || !email.includes('@')) {
            return responseProvider( res, null, 'provide a valid email', 400)
        }


        if (typeof password !== 'string' || password.length < 8) {
            return responseProvider( res, null, 'provide a valid password', 400)
        }

        return next();
    } catch (error) {
        return next(error);
        
    }
};







module.exports = {
    verifyUserSignUpInput,
     verifyUserLoginInput,
    verifyApplicationInput
}