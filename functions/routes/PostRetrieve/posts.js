// Import necessary modules
const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/Post");

// Create Express router
const router = express.Router();

// Post creation route
router.post("/posts", auth, async (req, res) => {
  try {
    const { content } = req.body;

    // Create new post
    const post = new Post({
      content,
      user: req.user.id, // User ID obtained from auth middleware
    });

    // Save post to database
    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
