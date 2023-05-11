const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "You haven't inserted a username"],
        min: 2,
        max: 15,
        validate: {
            validator: (value) => {
                return /\w+([\.-]?\w+)*/.test(value);
            },
            message: "Invalid username"
        }
    },
    password: {
        type: String,
        required: [true, "You haven't inserted a password"]
    },
    email: {
        type: String,
        required: [true, "You haven't inserted an email"],
        validate : {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@((gmail)|(hotmail)|(outlook)).([a-z]{2,3})$/.test(value)
            },
            message: "Invalid email"
        }
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);
