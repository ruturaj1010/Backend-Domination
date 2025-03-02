const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilty/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./user/signup.ejs");
});

router.post(
    "/signup",
    wrapAsync(async (req, res) => {
        try {
            let { email, username, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            req.flash("success", "Registration successful!");
            res.redirect("/listings");
        } catch (err) {
            req.flash("error", err.message);
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("./user/login.ejs");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    wrapAsync(async (req, res) => {
        req.flash("success", "Welcome, Login successfull");
        res.redirect("/listings");
    })
);

module.exports = router;
