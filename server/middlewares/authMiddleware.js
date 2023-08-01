const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRETE_KEY
    );
    const { _id, name, uPhoto, uPhone, uEmail } = decode;
    req.user = { id: _id, uName: name, uPhoto: uPhoto, uPhone, uEmail };
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
