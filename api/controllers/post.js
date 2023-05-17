const Post = require("../models/Post");

exports.createPost = async (req, res, next) => {
    try {

        console.log(req.body);
        
        const creator = req.body.creator;
        const caption = req.body.caption;
        const imageUrl = req.body.imageUrl;
        
        // if(!imageUrl) {
        //     res.status(400).json({
        //         success: false,
        //         error: "image url missing"
        //     });
        //     return;
        // }

        // if(!creator) {
        //     res.status(400).json({
        //         success: false,
        //         error: "user id missing"
        //     });
        //     return;
        // }

        console.log(creator);
        console.log(caption);
        console.log(imageUrl);

        // const newPost = new Post({
        //     creator,
        //     imageUrl,
        //     caption
        // });

        // await newPost.save();
        
        // res.status(201).json({
        //     success: true,
        //     data: newPost
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}