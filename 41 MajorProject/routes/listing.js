const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilty/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  deleteListing,
  updateListing,
} = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  // index route
  .get(wrapAsync(index))
  // create route
  .post(isLoggedIn, 
    // validateListing,
    upload.single("listing[image]"), 
    wrapAsync(createListing)
  );

// new route
router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  // show route
  .get(wrapAsync(showListing))
  // update route
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), wrapAsync(updateListing))
  // delete route
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// read route
router.get("/:id/edit", isLoggedIn, wrapAsync(renderEditForm));

module.exports = router;
