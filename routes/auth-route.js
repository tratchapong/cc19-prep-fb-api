const express = require('express')
const { register, login, getMe } = require('../controllers/auth-Controller')
const authenticate = require('../middlewares/authenticate')
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/me', authenticate, getMe)


module.exports = authRoute