const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userModel = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

userModel.plugin(plm,{
    usernameField: 'email'
});
const user = mongoose.model("user", userModel);

module.exports = user;