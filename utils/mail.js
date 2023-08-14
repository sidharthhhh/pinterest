const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendmail = function (req, res, user) {
    const pageurl =
        req.protocol + "://" + req.get("host") + "/change-password/" + user._id;
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "swayam1044@gmail.com",
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: "sidharth Pvt. Ltd.<swayam1044@gmail.com`.com>",
        to: req.body.email,
        subject: "Password Reset Link",
        text: "Do not share this link to anyone.",
        html: `<a href=${pageurl}>Password Reset Link</a>`,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return res.send(err);
        console.log(info);
        user.passwordResetToken = 1;
        user.save();
        return res.send(
            "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
        );
    });
};