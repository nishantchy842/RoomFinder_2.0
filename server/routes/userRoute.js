const express = require('express')
const { userRegister, userPostLogin } = require('../controllers/userController')




const router = express.Router()

//register || method post
router.post('/register', userRegister)
//login route || method post
router.post('/login',userPostLogin)

module.exports = router