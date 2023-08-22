const express = require('express')
const router = express.Router()
const AuthController = require("../Controllers/Auth.controller")

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

// router.get('/getemail',AuthController.getUserEmail)
router.get('/getemail/:userId', AuthController.getUserEmail);

module.exports = router