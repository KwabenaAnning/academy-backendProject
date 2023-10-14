const addAssessment = `
    INSERT INTO assessments(
        application_batch_id,
        image_url, 
        time_allocated,
        questions
    ) VALUES ($1,$2,$3,$4) RETURNING id, created_at`;


const addAssessmentResults = `
    INSERT INTO assessment_results(
        user_id,
        assessment_id,
        application_id,
        time_allocated,
        time_spent,
        responses
    ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at`;

const addAssessmentBatch = `
    INSERT INTO applicationsBatches(
        batch_id, 
        image_url,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`;

const getAssessmentBatchById = `
        SELECT id FROM applicationsBatches WHERE batch_id=$1
`;

const getUserUniqueAssessmentResult = `
    SELECT id FROM assessment_results WHERE assessment_id=$1 AND application_id=$2
`;

const getAllAssessments = `
        SELECT * FROM assessment_results`;

const getSingleAssessment = `
    SELECT id AS assessment_result_id,
    user_id,
    assessment_id,
    application_id,
    time_allocated,
    time_spent,
    responses
    FROM assessment_results 
    WHERE id=$1
    LIMIT 1;
`;


module.exports = {
    addAssessmentResults,
    addAssessment,
    getAllAssessments,
    getSingleAssessment,
    addAssessmentBatch,
    getAssessmentBatchById,
    getUserUniqueAssessmentResult
}
