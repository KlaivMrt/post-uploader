<<<<<<< HEAD
const path = require("path");
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
const port = process.env.PORT || 5000;

const connectDB = require("./config/db");

const authRouter = require("./routes/auth");

const privateKey = fs.readFileSync("server.key");
const sertificate = fs.readFileSync("server.cert");

connectDB();

const app = express();

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}));

app.use("/api/user", authRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
// const server = https.createServer({key: privateKey, cert: certificate}, app);
// server.listen(port, () => console.log(`Server listening on port: ${port}`))
=======
const path = require("path");
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();
const port = process.env.PORT || 5000;

const connectDB = require("./config/db");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

// const privateKey = fs.readFileSync("server.key");
// const sertificate = fs.readFileSync("server.cert");

connectDB();

const app = express();

const filestorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "/img");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (rew, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.json());
app.use(multer({storage: filestorage, fileFilter: fileFilter}).single("imageUrl"));
app.use("/img", express.static(path.resolve(__dirname, "../img")));
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}));

app.use("/api/user", authRouter);
app.use("/api/post", postRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
// const server = https.createServer({key: privateKey, cert: certificate}, app);
// server.listen(port, () => console.log(`Server listening on port: ${port}`))
>>>>>>> refs/remotes/origin/master
