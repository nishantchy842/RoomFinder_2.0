const express = require("express");
const {
  userRegister,
  userPostLogin,
  getSingleUser,
  totalUsers,
  recentUsers,
  updateProfile,
  PostGetOtp,
  getAllUser,
  deleteUser,
} = require("../controllers/userController");

const userModel = require("../models/userModel");
const Token = require("../models/token");

const router = express.Router();

const multer = require("multer");
const { requireSignIn } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

//register || method post
router.post("/register", upload.single("profile"), userRegister);
//login route || method post
router.post("/login", userPostLogin);
router.get("/user/:id", getSingleUser);
router.get("/totaluser", totalUsers);
router.get("/recentusers", recentUsers);
router.patch("/updateProfile", requireSignIn, updateProfile);

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    console.log(req.params.id);
    const token = await Token.findOne({
      userId: user._id.toString(),
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });
    console.log(user._id.toString());
    await userModel.updateOne({ _id: user._id.toString() }, { verified: true });
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/users", PostGetOtp);
router.get("/get_all_users", getAllUser);
router.delete("/delete_user/:id", deleteUser);
module.exports = router;
