const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.post(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.CLIENT_HOST + "dashboard");
  }
);

// @desc    Logout user
// @route   /auth/logout
// Route for user logout
router.get("/logout", (req, res) => {
  req.logout(); // Log out the user using Passport.js
  req.session.destroy((err) => {
    // Destroy the session, removing it from the store
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/"); // Redirect the user to the home page
    }

    // Redirect the user to the login page after successful logout
    res.redirect(process.env.CLIENT_HOST);
  });
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "MyProjects",
        populate: {
          path: "ResumeTemplateId",
          select: "_id Title ImageLink",
        },
      })
      .lean();
    return res.status(200).json({ user });
  } catch {
    return res.status(400).json({ error: "Invalid User" });
  }
});

module.exports = router;
