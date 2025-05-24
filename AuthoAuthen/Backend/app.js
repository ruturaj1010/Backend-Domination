const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, name) => {
            if (err) return cb(err);

            const uniqueName = name.toString('hex') + path.extname(file.originalname);
            cb(null, uniqueName);
        });
    }
})

const upload = multer({ storage: storage })

app.post('/', upload.single("image"), (req, res) => {
    res.send("Welcome to the root route my friend.")
})

app.listen(8080, () => {
    console.log("successfully running on port 8080")
})