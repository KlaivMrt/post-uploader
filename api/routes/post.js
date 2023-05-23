const express = require("express");
const router = express.Router();

const {createPost, getPosts, getPost, deletePost} = require("../controllers/post");

router.post("/create", createPost);
router.get("/get-posts/:id", getPosts);
router.get("/get-post/:id", getPost);
router.delete("/delete/:id", deletePost);

module.exports = router;
