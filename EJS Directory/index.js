const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res)=>{
    // res.send("this is a homepage");
    res.render("home.ejs");
})

app.get("/rolldice", (req, res)=>{
    let diceVal =  Math.floor(Math.random()*6 + 1 );

    res.render("rolldice.ejs", {num : diceVal});
})

// app.get("/ig/:username", (req, res)=>{
//     let {username } = req.params;
//     const followers = ["Ruturaj", "Ayush", "Sakshi", "Sunita", "Akash"]
//     res.render("instauser.ejs", {username, followers});
// })


// THIS IS FOR INSTAFOLLOWERS FILE PATH
app.get("/ig/:username", (req, res)=>{
    
    const { username } = req.params;

    const instadata = require("./data.json");
    // console.log(instadata);

    const data = instadata[username];
    console.log(data);
    if(data) {
        res.render("instafollowers.ejs", { data });
    } else {
        res.render("error.ejs")
    }
})

app.listen(port , ()=>{
    console.log(`Server is listeing at port ${port}`);
})

