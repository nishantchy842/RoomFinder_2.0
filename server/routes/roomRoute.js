const express = require('express')
const { createRoom, getRoom } = require('../controllers/roomController')
const path = require('path')


const router = express.Router()


const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })




//create room api
router.post('/addroom',upload.array('photos', 12), createRoom)
//get all room
router.get('/room', getRoom)


module.exports = router