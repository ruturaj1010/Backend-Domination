const express = require('express');
const app = express();
const session = require("express-session");


const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false,
    saveUninitialized : true
}

app.use(session(sessionOptions));

app.get("/test" , (req , res)=> {
    res.send("Hi, I am root");
})

app.get("/reqcount" , (req , res)=>{
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }

    res.send(`you have visited ${req.session.count} times`);
})

app.get("/register" , (req , res)=>{
    let { name="anonymous" } = req.query;
    req.session.name = name;
    res.send(`welcome ${name}`);
})

app.get("/hello" , (req , res)=>{
    res.send(`Hello ${req.session.name}`);
})

app.listen(8080 , ()=>{
    console.log("server is listening on port 8080");
})