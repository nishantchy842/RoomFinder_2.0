const express = require('express')
const { userRegister, userPostLogin, getSingleUser, totalUsers, recentUsers, updateProfile } = require('../controllers/userController')




const router = express.Router()

const multer = require('multer')
const { requireSignIn } = require('../middlewares/authMiddleware')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })

//register || method post
router.post('/register', upload.single('profile'), userRegister)
//login route || method post
router.post('/login', userPostLogin)
router.get('/user/:id', getSingleUser)
router.get('/totaluser', totalUsers)
router.get('/recentusers', recentUsers)
router.patch('/updateProfile', requireSignIn, updateProfile);


module.exports = router