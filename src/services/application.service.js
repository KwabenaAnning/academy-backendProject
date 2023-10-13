const { addApplication, addApplicationBatch, getApplicationByemail, getApplicationBatchById, getAllApplications, getSingleApplication,
    getUserUniqueApplication
} = require('../queries/applications');
const { runQuery } = require('../config/database.config');
const { findUserByEmail } = require('../queries/users');
// const cloudinary = require('../../utils/cloudinary'); 


/**
 * Add new application
 */

// Import necessary modules and queries

// Function to add a new application
const addNewApplication = async (body) => {
    const { email, image_url, first_Name, last_Name, cv_url, date_of_birth, address, university,
         course, cgpa,  user_id } = body;
    console.log('services', image_url, cv_url)
    // Check if the user exists in the "users" table
    const [user] = await runQuery(findUserByEmail, [email]);
  
    if (!user) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        };
    }

    // Continue with the application insertion
    const result = await runQuery(addApplication, [ email, image_url, first_Name, last_Name, cv_url, date_of_birth, address, university, course, cgpa, "pending",  user_id]);

    return {
        code: 201,
        status: 'success',
        message: 'New application added successfully',
        data: result[0]
    };
};

// Rest of your code...


// const addNewApplication = async (body) => {
//     const {  email, image_url, first_Name, last_Name, cv_url, date_of_birth, address, university, course, cgpa} = body; 

//     // Check if application already exists
//     const application = await runQuery(getApplicationByemail, [ email])
//     if (application.length > 0) {
//         throw {
//             code: 409,
//             status: 'error',
//             message: 'Application already exist',
//             data: null
//         }
//     }
    

//     // const created_at = new Date();
//     const result = await runQuery(addApplication, [ email, image_url, first_Name, last_Name, cv_url, date_of_birth, address, university, course, cgpa, "pending"])
//     return {
//         code: 201,
//         status: 'success',
//         message: 'New application added successfully',
//         data: result[0]
//     }
// }

/**
 * Get all applications
 */
const retrieveAllApplications = async () => {
    const data = await runQuery(getAllApplications);
    return {
        code: 200,
        status: 'success',
        message: 'Applications fetched successfully',
        data
    }
}

/**
 * Get Single Application
 */
const retrieveOneApplication = async (id) => {
    const result = await runQuery(getSingleApplication, [id]);
    if(result[0]){
        return {
            code: 200,
            status: 'success',
            message: 'Single application fetched successfully',
            data: result[0]
        }
    }else {
        return {
            code: 404,
            status: 'failed',
            message: `no data found for id ${id}`,
            data: null
        }
    }
}

const addNewApplicationBatch = async (body) => {
    const { batch_id, image_url, link, deadline, instructions } = body;

    // Check if application batch already exists
    const application = await runQuery(getApplicationBatchById, [batch_id])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `Application with batch Id ${batch_id} already exist`,
            data: null
        }
    }

    const result = await runQuery(addApplicationBatch, [batch_id, image_url,
        link,
        deadline,
        instructions])
    return {
        code: 201,
        status: 'success',
        message: 'New application added successfully',
        data: result[0]
    }
}

const RetrieveMyID = async (body) => {
    const { email } = body; // Assuming you only need the email

    // Check if application with the given email exists
    const application = await runQuery(getUserUniqueApplication, [email]);

    if (application.length === 0) {
        throw {
            code: 404, // Change to 404 to indicate not found
            status: 'error',
            message: `Email not found.`,
            data: null
        };
    }

    // Extract the id and email from the application
    const { id, email: foundEmail } = application[0];

    return {
        code: 200, // Use 200 for successful responses
        status: 'success',
        message: 'ID retrieved successfully',
        data: { id, email: foundEmail } // Send only the id and email in the response
    };
};

// validateSortOrder.js

// const applicationOrder = async (body) => {
//     const { first_Name, last_Name, date_of_birth, Address, University, CGPA } = body;

//     try {
//         const sortedApplications = await runQuery(applicationDSC, [first_Name, last_Name, date_of_birth, Address, University, CGPA]);

//         return {
//             code: 201,
//             status: 'success',
//             message: 'Applications retrieved orderly',
//             data: sortedApplications,
//         };
//     } catch (error) {
//         return {
//             code: 409,
//             status: 'error',
//             message: 'An error occurred while retrieving applications',
//             data: null,
//         };
//     }
// };




module.exports = {
    addNewApplication,
    retrieveAllApplications,
    retrieveOneApplication,
    addNewApplicationBatch,
      RetrieveMyID
    //   applicationOrder
    // imageDoc,
}