const express = require('express');
const ApplicationController = require('../controllers/application.controller')
const {validAdmin, validApplicant} = require("../middlewares/permission.middleware");

const router = express.Router();

router.post('/create', validAdmin, ApplicationController.createApplication);
router.post('/apply', validApplicant, ApplicationController.apply);
router.get('/fetchapplications', validAdmin, ApplicationController.fetchAllApplications);
router.get('/:id',validAdmin, ApplicationController.fetchSingleApplication);
router.put('/:id', ApplicationController.updateSingleApplication);

module.exports = router
