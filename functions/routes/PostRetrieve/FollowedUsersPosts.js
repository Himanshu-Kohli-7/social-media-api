// Import necessary modules
const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/Post");

// Create Express router
const router = express.Router();

// Retrieve posts of users user follows route
router.get("/feed", auth, async (req, res) => {
  try {
    // Retrieve posts of users user follows
    const feedPosts = await Post.find({ user: { $in: req.user.following } });

    res.json(feedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
