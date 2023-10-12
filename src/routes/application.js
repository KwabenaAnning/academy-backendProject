const express = require('express');
const ApplicationController = require('../controllers/application.controller')
const {validAdmin, validApplicant} = require("../middlewares/permission.middleware");
const { userImageUploader, userCvUploader} = require('../middlewares/cloudinary.middleware'); // Import the Cloudinary middleware
// const userController = require('../controllers/application.controller');

const router = express.Router();
// router.post('/', upload.single('file'), ApplicationController.createApplication);
router.post('/createB', validAdmin, ApplicationController.createApplicationBatch);
router.post('/create', validApplicant, userImageUploader, userCvUploader, ApplicationController.createApplication);
router.get('/', validAdmin, ApplicationController.fetchAllApplications);
router.get('/email', validAdmin, ApplicationController.RetrieveID);
router.get('/:id',validAdmin, ApplicationController.fetchSingleApplication);
router.put('/:id', ApplicationController.fetchSingleApplication);

// router.get('/all', validAdmin, ApplicationController.descOrder);



module.exports = router
