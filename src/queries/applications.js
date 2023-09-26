const addApplication = `
    INSERT INTO applications(
        application_batch_id,
        email,
        image_url,
        first_name,
        last_name,
        cv_url,
        date_of_birth,
        address,
        university,
        course,
        cgpa,
        status
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, created_at
`;

const addApplicationBatch = `
    INSERT INTO application_batches(
        batch_id, 
        image_url,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`;

const getApplicationByemail = `
        SELECT id, email, first_name, last_name, user_id FROM applications WHERE email=$1
`;

const getApplicationBatchById = `
        SELECT id FROM application_batches WHERE batch_id=$1
`;

const getUserUniqueApplication = `
        SELECT id FROM applications WHERE email=$1 AND application_batch_id=$2
`;

const getAllApplications = `
        SELECT * FROM applications
`

const getSingleApplication = `
        SELECT id,  
        application_batch_id,
        email,
        image_url,
        first_name,
        last_name,
        cv_url,
        date_of_birth,
        address,
        university,
        course,
        cgpa, 
        created_at, 
        updated_at,
        FROM applications WHERE id=$1
`

const updateApplication = `
UPDATE applicationss 
    SET email = $2, first_name = $3, last_name = $4
    WHERE id = $1
`;

module.exports = {
    addApplication,
    getApplicationByemail,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    addApplicationBatch,
    getApplicationBatchById,
    getUserUniqueApplication
}



