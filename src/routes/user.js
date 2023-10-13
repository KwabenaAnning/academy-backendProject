const express = require('express');
const { createUser, signInUser, updatetheTaken, updateTheTestScores, grabAllUsers } = require('../controllers/user.controller')
const {checkSignUpApplicantInput, checkApplicantLoginInput} =require ('../middlewares/user.middleware')
const router = express.Router()

router.post('/signup', checkSignUpApplicantInput,createUser);
router.post('/login', checkApplicantLoginInput, signInUser);
router.put('/takenUp/:id', updatetheTaken);
router.put('/testUp/:id', updateTheTestScores);
router.get('/', grabAllUsers);

module.exports = router;