const JWT = require("jsonwebtoken")

//Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.SECRETE_KEY
        );
        const { _id, name, uPhoto, uPhone, uEmail } = decode;
        req.user = { id: _id, uName: name, uPhoto: uPhoto, uPhone, uEmail }
        next();
    } catch (error) {
        console.log(error);
    }
};