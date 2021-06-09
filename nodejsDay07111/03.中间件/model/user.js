const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//创建一个model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;