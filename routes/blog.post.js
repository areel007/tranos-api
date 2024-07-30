const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const blogPostController = require("../controllers/blog.post");

// create a blog post
router
  .route("/")
  .post(upload.single("blogImage"), blogPostController.createBlogPost)
  .get(blogPostController.getBlogs);

router
  .route("/:id")
  .get(blogPostController.getBlog)
  .delete(blogPostController.deleteBlog);

module.exports = router;
