const express = require('express');
const { createUser, signInUser, updatetheTaken, updateTheTestScores,
    findAdmin,updateAdmin,fetchAdminCreds, grabAllUsers,fetchAdmin } = require('../controllers/user.controller')
const {checkSignUpApplicantInput, checkApplicantLoginInput} =require ('../middlewares/user.middleware')
const {validAdmin} = require("../middlewares/permission.middleware");

const router = express.Router()

router.post('/signup', checkSignUpApplicantInput,createUser);
router.post('/login', checkApplicantLoginInput, signInUser);
router.put('/takenUp/:id', updatetheTaken);
router.put('/testUp/:id', updateTheTestScores);
router.get('/', grabAllUsers);
router.get('/:id', fetchAdmin);
router.get('/single/:id', validAdmin, findAdmin);
router.patch('/update/:id', validAdmin, updateAdmin)
router.get('/admin', fetchAdminCreds);


module.exports = router;