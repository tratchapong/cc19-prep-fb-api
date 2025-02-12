const express = require('express')
const { register, login, getMe, registerZod } = require('../controllers/auth-Controller')
const authRoute = express.Router()

authRoute.post('/register', registerZod)
authRoute.post('/login', login)
authRoute.get('/me', getMe)


module.exports = authRoute