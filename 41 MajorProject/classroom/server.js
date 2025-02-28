const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");
const flash = require("connect-flash");


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    next();
});

app.get("/test", (req, res) => {
    res.send("Hi, I am root");
});

app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }

    res.send(`you have visited ${req.session.count} times`);
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    // res.send(`welcome ${name}`);
    if (name === "anonymous") {
        req.flash("error", "user registration failed");
    } else {
        req.flash("success", "user registered successfully");
    }

    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // res.send(`Hello ${req.session.name}`);
    res.render("page.ejs", { name: req.session.name });
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});