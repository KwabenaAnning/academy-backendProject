const express = require('express');
const router = express.Router();
const { verifyUserSignUpInput, verifyUserLoginInput} = require('../middlewares/user.middleware')
const { createUser, signInUser,} = require('../controllers/user.controller');


router.post('/signup', verifyUserSignUpInput, createUser);
router.post('/login', verifyUserLoginInput, signInUser);


module.exports = router;