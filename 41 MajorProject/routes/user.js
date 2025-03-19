const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilty/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  showSignup,
  signup,
  showLogin,
  login,
  logout,
} = require("../controllers/user.js");

router
  .route("/signup")
  .get(showSignup)
  .post(wrapAsync(signup));

router
  .route("/login")
  .get(showLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(login)
  );

router.get("/logout", logout);

module.exports = router;
