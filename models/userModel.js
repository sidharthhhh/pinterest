const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userModel = new mongoose.Schema({
    passwordResetToken: {
        type: Number,
        default: 0,
    },
    username: String,
    password: String,
    email: String,
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
});

userModel.plugin(plm,{
    usernameField: 'email'
});
const user = mongoose.model("user", userModel);

module.exports = user;