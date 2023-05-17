const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: [true, "you haven't inserted a user id"]
    },
    imageUrl: {
        type: String,
        required: [true, "you haven't inserted an image url"]
    },
    caption: {
        type: String,
        max: 500
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema);