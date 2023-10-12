const express = require('express');
const { createUser, signInUser, updatetheTaken, updateTheTestScores, grabAllUsers } = require('../controllers/user.controller')

const router = express.Router()

router.post('/signup', createUser);
router.post('/login', signInUser);
router.put('/takenUp/:id', updatetheTaken);
router.put('/testUp/:id', updateTheTestScores);
router.get('/', grabAllUsers);

module.exports = router;