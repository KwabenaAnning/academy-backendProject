const express = require('express')
const api = express.Router()
const users = require('../../routes/user.route')


api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to Academy API'
}))

api.use('/users', users)


module.exports = api