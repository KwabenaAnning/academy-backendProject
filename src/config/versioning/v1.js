const express = require('express');
const api = express.Router()
const users = require('../../routes/user')
const application = require('../../routes/application')


api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to My App API'
}))

api.use("/users", users);
api.use("/application", application)



module.exports = api