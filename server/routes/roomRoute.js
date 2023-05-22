const express = require('express')
const { createRoom, getRoom, getUserRooms, deleteRoom, updateRoom, getSingleRoom, searchRoom, productListController } = require('../controllers/roomController')
const { requireSignIn } = require('../middlewares/authMiddleware')

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
router.post('/addroom', upload.array('photos', 12), requireSignIn, createRoom)
//get all room
router.get('/room', getRoom)
//get room of user
router.get('/userRoom/:uid', getUserRooms)
//delete room
router.delete('/deleteroom/:rid', requireSignIn, deleteRoom)
//update room
router.put('/update/:rid', upload.array('photos', 12), requireSignIn, updateRoom)
//get single room
router.get('/single-room/:rid', getSingleRoom)
//serch key
router.get('/search/:keyword', searchRoom)
//
router.get("/product-list/:page", productListController);


module.exports = router