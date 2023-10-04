const { addAssessment, addAssessmentBatch,addAssessmentResults, getAssessmentByTitle, getAssessmentBatchById, getAllAssessments, getSingleAssessment, updateAssessment,
    getUserUniqueAssessmentResult
} = require('../queries/assessment');
const { runQuery } = require('../config/database.config');

/**
 * Add new application
 */
const addNewAssessment = async (body) => {
    const {application_batch_id, image_url, questions } = body;

    const result = await runQuery(addAssessment, [application_batch_id,image_url, 50, JSON.stringify(questions)])
    return {
        code: 201,
        status: 'success',
        message: 'New assessment added successfully',
        data: result[0]
    }
}

/**
 * Get all applications
 */
const retrieveAllAssessments = async () => {
    const data = await runQuery(getAllAssessments);
    return {
        code: 200,
        status: 'success',
        message: 'Assessments fetched successfully',
        data
    }
}

/**
 * Get Single Assessment
 */
const retrieveSingleAssessment = async (id) => {
    const result = await runQuery(getSingleAssessment, [id]);
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

const updateSingleAssessment = async (id, body) => {
    const data = await runQuery(updateAssessment, [id, body.title, body.author]);
    return {
        code: 200,
        status: 'success',
        message: `Assessment with id ${id} updated successfully`,
        data: []
    }
}

const addNewAssessmentBatch = async (body) => {
    const { batch_id, imageUrl,
        link,
        deadline,
        instructions } = body;

    // Check if application batch already exists
    const application = await runQuery(getAssessmentBatchById, [batch_id])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `Assessment with batch Id ${batch_id} already exist`,
            data: null
        }
    }

    const result = await runQuery(addAssessmentBatch, [batch_id, imageUrl,
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

const takeAssessment = async (body) => {
    const {user_id,assessment_id,application_id,  time_allocated, time_spent, responses } = body;

    // Check if application batch already exists
    const application = await runQuery(getUserUniqueAssessmentResult, [assessment_id, application_id])
    console.log(application)
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `You have already submitted your responses.`,
            data: null
        }
    }

    const result = await runQuery(addAssessmentResults, [user_id, assessment_id, application_id, time_allocated, time_spent, JSON.stringify(responses)])
   console.log(result)
    return {
        code: 201,
        status: 'success',
        message: 'Assessment result recorded successfully',
        data: result[0]
    }
}

module.exports = {
    addNewAssessment,
    retrieveAllAssessments,
    retrieveSingleAssessment,
    updateSingleAssessment,
    addNewAssessmentBatch,
    takeAssessment
}
