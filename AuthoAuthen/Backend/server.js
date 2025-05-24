const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/genpass", (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        // console.log(salt)
        bcrypt.hash("Password", salt, function (err, hash) {
            console.log(hash)
        });
    });
    res.send("Password")
});

app.get("/comparepass", (req, res) => {
    bcrypt.compare("Password", "$2b$10$ewWyy8QnSW4htgm/MdJAkebJPUOoVlm9xswNNL5U8r/uUQiGYVc1y", function (err, result) {
        console.log(result)
    });
});

app.get("/gentoken", (req, res) => {
    const token = jwt.sign({ email: "ruturaj@gmail.com" }, "secret");
    res.cookie("token", token);
    console.log(token);
    res.send("Generated token");
});

app.get("/gettoken", (req, res)=>{
    console.log(req.cookies.token)
    res.send("Done")
});

app.get("/seedata", (req, res)=>{
    const data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send("Done");
})

// app.get("/", (req, res)=>{
//     res.cookie("name", "Ruturaj")
//     res.send("Welcome")
// });

// app.get("/read", (req, res)=>{
//     console.log(req.cookies);
//     res.send("Done");
// });

app.listen(8080, () => {
    console.log("The server is running at port 8080")
});