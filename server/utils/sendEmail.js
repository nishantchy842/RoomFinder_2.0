const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    console.log(email, subject, text)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nishantchaudhary842@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: '08902c3a9e8db0',
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};