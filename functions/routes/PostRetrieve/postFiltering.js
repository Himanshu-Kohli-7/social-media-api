const Post = require("../../models/post.js");

// Retrieve posts from a specific user sorted by creation date
const userId = "user123";
const filteredAndSortedPosts = await Post.find({ user: userId }).sort({
  createdAt: -1,
});
