const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        if(!email || !password) {
            res.status(400).jsons({
                success: false,
                error: "Entry/ies missing"
            });
            return;
        }

        if(!/^\w+([\.-]?\w+)*@((gmail)|(hotmail)|(outlook)).([a-z]{2,3})$/.test(email)) {
            res.status(400).jsons({
                success: false,
                error: "Invalid email"
            });
            return;
        }

        const user = await User.findOne({email: email})

        if(!user) {
            res.status(404).json({
                succes: false,
                error: "User not found"
            });
            return;
        }

        console.log(user);

        const check = await bcrypt.compare(password, user.password);

        if(!check) {
            res.status(401).json({
                succes: false,
                error: "Wrong password"
            });
            return;
        }

        const token = jwt.sign({
            userId: user._id,
            userName: user.username
        },
        process.env.SECRET,
        {expiresIn: "1h"}
        );

        res.status(200).json({
            success: true,
            token,
            data: user
        }); 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

exports.createUser = async (req, res, next) => {
    try {        
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;
        
        if(!email || !username || !password || !password2) {
            res.status(400).jsons({
                success: false,
                error: "Entry/ies missing"
            });
            return;
        }

        if(!/^\w+([\.-]?\w+)*@((gmail)|(hotmail)|(outlook)).([a-z]{2,3})$/.test(email)) {
            res.status(400).jsons({
                success: false,
                error: "Invalid email"
            });
            return;
        }

        if(!/^\w+([\.-]?\w+)$/.test(username) || username.length > 15 || username.length < 2) {
            res.status(400).jsons({
                success: false,
                error: "Invalid username"
            });
            return;
        }
        
        if(password.length > 18 || password.length< 8 || password !== password2) {
            res.status(409).json({
                success: false,
                error: "Invalid password"
            });
            return;
        }
        
        const user = await User.findOne({email: email});

        if(user) {
            res.status(409).json({
                success: false,
                error: "User already exists"
            });
            return;
        }

        const encPass = await bcrypt.hash(password, 12);

        const newUser = new User({
            username: username,
            password: encPass,
            email: email
        });

        await newUser.save();

        const token = jwt.sign({
            userId: mewUser._id,
            userName: mewUser.username
        },
        process.env.SECRET,
        {expiresIn: "1h"}
        );

        res.status(200).json({
            success: true,
            token,
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}
