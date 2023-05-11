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
        cb(
            null,
            Date.now() +
            '_' +
            Math.ceil(Math.random() * 123232) +
            '.' +
            file.mimetype.split('/')[1]
        )
    },
})

const upload = multer({ storage: storage })




//create room api
router.post('/addroom', upload.single('roomImage'), createRoom)
//get all room
router.get('/room',getRoom)


module.exports = router