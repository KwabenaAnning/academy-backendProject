const AssessmentService = require('../services/assessment.service');

/**
 * Controller function to add new application
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} - A JSON response containing the applications detail
 */
const createAssessment = async (req, res, next) => {
    try {
        const result = await AssessmentService.addNewAssessment(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const takeAssessment = async (req, res, next) => {
    try {
        const result = await AssessmentService.takeAssessment(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const grabAllAssessments = async (req, res, next) => {
    try {
        const result = await AssessmentService.retrieveAllAssessments(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}


const grabSingleAssessments = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await AssessmentService.retrieveSingleAssessment(id);
        console.log(result)
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createAssessment,
    takeAssessment,
    grabAllAssessments,
    grabSingleAssessments
}