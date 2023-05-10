const express = require('express')
const { createRoom } = require('../controllers/roomController')


const router = express.Router()

//create room api
router.post('/addroom',createRoom)


module.exports = router