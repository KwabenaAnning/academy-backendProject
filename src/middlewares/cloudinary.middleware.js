const { runQuery } = require('../config/database.config');
const { findUserByEmail } = require('../queries/users');
const cloudinary = require("../../utils/cloudinary");
const {files} = require("express/lib/request");
const config = require("../config/env");


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


// const getSecureUrl = async (fileData) => {
//     try {
//         cloudinary.config({
//             cloud_name: config.CLOUDINARY_CLOUD_NAME,
//             api_key: config.CLOUDINARY_API_KEY,
//             api_secret: config.CLOUDINARY_SECRET_KEY
//         });
//         return new Promise((resolve, reject) => {
//             cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
//                 if (error) {
//                     reject({
//                         isSuccess: false,
//                         message: error.message,
//                         data: null
//                     });
//                 } else {
//                     resolve({
//                         isSuccess: true,
//                         message: "File uploaded successfully",
//                         data: result.secure_url
//                     });
//                 }
//             }).end(fileData);
//         });
//     } catch (error) {
//         return {
//             isSuccess: false,
//             message: error.message,
//             data: null
//         };
//     }
// };


// // const userImageUploader = async (req, res, next) => {
// //     try {
// //         const image = req.files.image_url; 

// //         if (!image) {
// //             return res.status(400).json({
// //                 status: 'error',
// //                 code: 400,
// //                 message: 'No image provided',
// //                 data: null,
// //             });
// //         }

// //         const uploadResponse = await getSecureUrl(image.data); 

// //         if (!uploadResponse.isSuccess) {
            
// //             return res.status(424).json({
// //                 status: 'failed',
// //                 code: 424,
// //                 message: uploadResponse.message,
// //                 data: null,
// //             });
// //         }

// //         req.body.image_url = uploadResponse.data; 

// //         return next();
// //     } catch (error) {
// //         return next(error);
// //     }
// // };

// const userImageUploader = async (req, res, next) => {
//     try {
//         if (!req.files || !req.files.image_url) {
//             return res.status(400).json({
//                 status: 'error',
//                 code: 400,
//                 message: 'No image provided',
//                 data: null,
//             });
//         }

//         const image = req.files.image_url;
//         const uploadResponse = await getSecureUrl(image.data); 

//         if (!uploadResponse.isSuccess) {
//             return res.status(424).json({
//                 status: 'failed',
//                 code: 424,
//                 message: uploadResponse.message,
//                 data: null,
//             });
//         }

//         req.body.image_url = uploadResponse.data; 

//         return next();
//     } catch (error) {
//         return next(error);
//     }
// };




// const userCvUploader = async (req, res, next) => {

//     try {

//         const cv_url = req.files.cv_url;
        
//         if (!cv_url) {
//             return res.status(400).json({
//                 status: 'error',
//                 code: 400,
//                 message: 'No cv provided',
//                 data: null,
//             });
//         }
        
//         const uploadResponse = await getSecureUrl(cv_url.data);

//         if (!uploadResponse.isSuccess) {

//             return res.status(424).json({
//                 status: 'failed',
//                 code: 424,
//                 message: uploadResponse.message,
//                 data: null,
//             });
//         }
        
//         req.body.cv_url = uploadResponse.data

//         return next();

//     } catch (error) {
//         return next(error);
//     }
// };


module.exports = {
    checkIfEmailExists,
};

