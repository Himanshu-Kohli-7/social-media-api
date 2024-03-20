// Import necessary modules
const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");

// Create Express router
const router = express.Router();

// Follow user route
router.put("/follow/:userId", auth, async (req, res) => {
  try {
    const userIdToFollow = req.params.userId;

    // Check if user exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add userIdToFollow to current user's following list
    req.user.following.push(userIdToFollow);
    await req.user.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Unfollow user route
router.put("/unfollow/:userId", auth, async (req, res) => {
  try {
    const userIdToUnfollow = req.params.userId;

    // Remove userIdToUnfollow from current user's following list
    req.user.following = req.user.following.filter(
      (userId) => userId !== userIdToUnfollow
    );
    await req.user.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
