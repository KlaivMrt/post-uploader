const express = require("express");
const router = express.Router();

const {createPost} = require("../controllers/post");

router.post("/create", createPost);

module.exports = router;
