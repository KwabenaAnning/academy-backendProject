/**
 * Application queries for create and fetch
 */
const addApplication = `
    INSERT INTO application(
        email,
        image_url,
        first_Name,
        last_Name,
        cv_url,
        date_of_birth,
        address,
        university,
        course,
        cgpa,
        status,
        user_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12) RETURNING id, created_at
`;

const addApplicationBatch = `
    INSERT INTO applicationsBatches(
        batch_id, 
        image_url,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`;


const getApplicationByemail = `
        SELECT id, first_Name, last_Name, email, date_of_birth, address, university, cgpa,status FROM application WHERE email=$1
`;

 const getApplicationBatchById = `
        SELECT id FROM applicationsBatches WHERE batch_id=$1
`;

const getAllApplications = `
        SELECT * FROM application`;


// const applicationDSC = `
// SELECT *
// FROM application
// WHERE first_Name = $1
//   AND last_Name = $2
//   AND date_of_birth = $3
//   AND Address = $4
//   AND University = $5
//   AND cgpa = $6
// ORDER BY cgpa DESC`;




const getUserUniqueApplication = `
SELECT id, email FROM application WHERE email = $1;
`;

const getSingleApplication = `
        SELECT id,  
        email,
        image_url,
        first_Name,
        last_Name,
        cv_url,
        date_of_birth,
        address,
        university,
        course,
        cgpa, 
        created_at, 
        updated_at,
        user_id
        FROM application WHERE id=$1`        


module.exports = {
    addApplication,
    getApplicationByemail,
    getAllApplications,
    getSingleApplication,
    addApplicationBatch,
    getUserUniqueApplication,
    getApplicationBatchById
}



