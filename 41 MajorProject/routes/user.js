const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilty/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

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
            req.login( registeredUser ,(err)=> {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Registration successful!");
                res.redirect("/listings");
            })
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
    saveRedirectUrl ,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    wrapAsync(async (req, res) => {
        req.flash("success", "Welcome, Login successfull");
        let redirectUrl = res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl);
    })
);

router.get("/logout" , (req, res, next)=>{ 
    req.logout((err)=>{
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/login");
    })
})

module.exports = router;
