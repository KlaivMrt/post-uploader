const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {createPost, getPosts, getPost, deletePost, updatePost} = require("../controllers/post");

router.post("/create", auth, createPost);
router.get("/get-posts", auth, getPosts);
router.get("/get-post/:id", auth, getPost);
router.delete("/delete/:id", auth, deletePost);
router.put("/update", auth, updatePost)

module.exports = router;
