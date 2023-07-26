const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/userHelper");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/token");

exports.userRegister = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    //backend validationssss
    if (!name) {
      return res.status(500).send("Name is required");
    }
    if (!email) {
      return res.status(500).send("Email is required");
    }
    if (!phone) {
      return res.status(500).send("Phone is required");
    }
    if (!address) {
      return res.status(500).send("Address is required");
    }
    if (!password) {
      return res.status(500).send("Password is required");
    }

    //check user
    const existingUser = await userModel.findOne({ email, phone });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already user",
      });
    }
    const hashedPassword = await hashPassword(password);

    let user = {};
    if (!req.file) {
      user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      }).save();
    } else {
      user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        profile: req.file.filename,
      }).save();
    }

    const token = await new Token({
      userId: user._id,
      token: Math.ceil(Math.random() * 918376),
    }).save();
    const url = `http://127.0.0.1:5173/users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    res.status(201).send({
      success: true,
      message: "An Email sent to your account please verify",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration Failed",
    });
  }
};

exports.userPostLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check users
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //check verified mail
    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: Math.ceil(Math.random() * 918376),
        }).save();
        const url = `http://127.0.0.1:5173/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    //token
    const token = await JWT.sign(
      {
        _id: user._id,
        name: user.name,
        uPhoto: user.profile,
        uEmail: user.email,
        uPhone: user.phone,
      },
      process.env.SECRETE_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        profile: user?.profile,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Fail login",
      error,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    res.status(200).send({
      success: true,
      message: "user info",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "get user failed",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await userModel
      .find({}, "_id name email phone address role profile createdAt")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "user info",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "get user failed",
    });
  }
};
//count number of users

exports.totalUsers = async (req, res) => {
  try {
    const estimate = await userModel.estimatedDocumentCount();
    res.status(200).send({
      success: true,
      totaluser: estimate,
    });
  } catch (error) {
    console.log(error);
    res.send("total number of user no found");
  }
};
//get recently added users

exports.recentUsers = async (req, res) => {
  try {
    const recentUser = await userModel.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).send({
      success: true,
      message: "Recent users",
      recentUser,
    });
  } catch (error) {
    console.log(error);
    res.send("no users found");
  }
};

//update profile

exports.updateProfile = async (req, res) => {
  try {
    const { name, address, email, phone } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { name, address, email, phone },
      {
        new: true,
      }
    );
    console.log(req.user.id, req.body);
    const { id, uName, uPhone, uEmail } = updatedUser;

    await roomModel.updateMany({ id, uName, uPhone, uEmail });

    const token = JWT.sign(
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        // uPhoto: updatedUser.profile,
        uEmail: updatedUser.email,
        uPhone: updatedUser.phone,
      },
      process.env.SECRETE_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Update Successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        // profile: updatedUser?.profile
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "update profile failed",
    });
  }
};

//get otp
const mongoose = require("mongoose");
// const { Schema } = mongoose;
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Otps = mongoose.model("Otps", otpSchema);
////////////////////////////////////////

exports.PostGetOtp = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const randomOtpCode = Math.ceil(Math.random() * 918376);
  await Otps.create({ otp: randomOtpCode });

  try {
    const data = await userModel.findOne({ email });

    if (data) {
      if (email == data.email) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "nishantchaudhary842@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: "08902c3a9e8db0", // sender address
          to: email, // list of receivers
          subject: "Reset your Super App password", // Subject line
          text: "Reset your password.", // plain text body
          html: `<h>Reset your Room Finder App password.</h><br><h>Your 2FA Code is <h><h1  style="color:#5A0047;">${randomOtpCode}</h1> `, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error", error);
          } else {
            console.log("Email sent!" + info.response);
            res.status(201).json({ status: 201, info });
          }
        });

        res.status(200).json({
          msg: "Password reset OTP sent to email.",
          dbUserId: data._id,
        });
      } else {
        res.status(401).json({ msg: "The email address doesn't exist" });
      }
    } else {
      res.status(400).json({ msg: "Email address does not exist." });
    }
  } catch (e) {
    console.log("Error:", e);
  }
};
//delete user

exports.deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "failed to delete" });
  }
};
