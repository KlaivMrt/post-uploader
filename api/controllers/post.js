const Post = require("../models/Post");
const fs = require("fs");
require("dotenv").config();

exports.createPost = async (req, res, next) => {
    try {
        const image = req.file;
        const creator = req.userId;
        const caption = req.body.caption;
        const imageUrl = req.file.path;
        
        if(!image) {
            res.status(400).json({
                success: false,
                error: "image missing"
            });
            return;
        }

        if(!creator) {
            res.status(400).json({
                success: false,
                error: "user id missing"
            });
            return;
        }
        
        const newPost = new Post({
            creator,
            imageUrl,
            caption
        });

        await newPost.save();
        
        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const id = req.userId;

        if(!id) {
            res.status(404).json({
                success: false,
                error: "No user id given"
            });
            return;
        }

        const response = await Post.find({creator: id});

        if(!response) {
            res.status(404).json({
                success: false,
                error: "No posts found"
            });
            return;
        }

        response.forEach((post) => {
            post.imageUrl = `http://172.17.0.2:${process.env.PORT}/${post.imageUrl}`
        });

        res.status(200).json({
            success: true,
            data: response
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const id = req.params["id"];

        if(!id) {
            res.status(400).json({
                success: false,
                error: "No user id given"
            });
            return;
        }

        const response = await Post.findOne({_id: id});
        
        if(!response) {
            res.status(404).json({
                success: false,
                error: "No post found"
            });
            return;
        }

        response.imageUrl = `http://172.17.0.2:${process.env.PORT}/${response.imageUrl}`;

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(400).json({
                success: false,
                error: "No post id given"
            });
            return;
        }

        const post = await Post.findOne({_id: id});

        if(!post) {
            res.status(404).json({
                success: false,
                error: "post not found"
            });
            return;
        }

        const response = await Post.deleteOne({_id: post._id});

        await fs.rm(`./${post.imageUrl}`, () => {
            console.log(`${post.imageUrl} image deleted`);
        });
        
        console.log(response);

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const id = req.body._id;
        const post = req.body;

        await Post.updateOne({_id: id}, {
            $set: {
                caption: post.caption
            }
        });

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}
