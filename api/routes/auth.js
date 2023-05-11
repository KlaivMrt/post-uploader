const express = require("express");
const router = express.Router();

const { getUser, createUser} = require("../controllers/auth")


router.post("/signup", createUser);

router.post("/signin", getUser);


module.exports = router;