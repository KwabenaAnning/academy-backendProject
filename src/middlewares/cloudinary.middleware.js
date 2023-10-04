const { runQuery } = require('../config/database.config');
const { findUserByEmail } = require('../queries/users');
const cloudinary = require("../../utils/cloudinary");


const checkIfEmailExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const [user = null] = await runQuery(findUserByEmail, [email]);
        if (!user) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Applicant does not exist',
                data: null,
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};

const uploadToCloudinary = async (fileData) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(fileData, {use_filename :true, resource_type: 'raw' });
        // When you use the parameter 'use_filename: true'  the file name is normalized and random characters are appended to ensure uniqueness so if you upload two files with the same name they would be given two different public IDs.
        // However, if you don't want this feature you can also include the parameter 'unique_filename: false' and then random characters won't be appended to the public ID.
        return secure_url;
    } catch (error) {
        return error;
    }
};


const userImageUploader = async (req, res, next) => {
    try {
        const { image_url } = req.body;
        console.log("image url", image_url) 
        const imgUrl = await uploadToCloudinary(image_url);
    
        if (!imgUrl || imgUrl instanceof Error) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Cannot upload image, try again!',
                data: null,
            });
        }

        req.imgUrl = imgUrl;
        return next();
    } catch (error) {
        return next(error);
    }
};

const userCvUploader = async (req, res, next) => {
    try {
        const { cv_url } = req.body;
        const setCvUrl = await uploadToCloudinary(cv_url);

        if (!setCvUrl || setCvUrl instanceof Error) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Cannot upload CV, try again!',
                data: null,
            });
        }

        req.setCvUrl = setCvUrl;
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    checkIfEmailExists,
    userImageUploader,
    userCvUploader,
};

