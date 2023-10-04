const {   addNewApplication,retrieveAllApplications, retrieveOneApplication, addNewApplicationBatch,
    RetrieveMyID} = require('../services/application.service');

/**
 * Controller function to add new application
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} - A JSON response containing the applications detail
 */
const createApplicationBatch = async (req, res, next) => {
    try {
        const result = await addNewApplicationBatch(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

// const createApplication = async (req, res, next) => {
//     try {
//         const result = await addNewApplication(req.body);
//         return res.status(result.code).json(result)
//     } catch (error) {
//         next(error)
//     }
// }

const RetrieveID = async (req, res, next) => {
    try {
        const result = await RetrieveMyID(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}
const fetchAllApplications = async (req, res, next) => {
    try {
        const result = await retrieveAllApplications();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const fetchSingleApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await retrieveOneApplication(id);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}


// const descOrder = async (req, res, next) => {
//     try {
//         const result = await applicationOrder(req.body);
//         return res.status(result.code).json(result)
//     } catch (error) {
//         next(error)
//     }
// }


// const updateSingleApplication = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const body = req.body;
//         const result = await updateSingleApplication(id, body);
//         return res.status(result.code).json(result)
//     } catch (error) {
//         next(error)
//     }
// }

const createApplication = async (req, res) => {
   try {
    const imageUrl = req.imgUrl
    const cvUrl = req.setCvUrl
    console.log(imageUrl, cvUrl)
    const result = await addNewApplication({ ...req.body, imageUrl, cvUrl });
    console.log(result)
    return res.status(201).json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error});
   }
};


module.exports = {
    createApplication,
    fetchAllApplications,
    fetchSingleApplication,
    RetrieveID,
    createApplicationBatch
}