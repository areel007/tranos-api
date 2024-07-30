const BlogPost = require("../models/blog.post");

exports.createBlogPost = async (req, res) => {
  try {
    const { title, subtitle, content, blogImage } = req.body;

    const newBlogPost = new BlogPost({
      title,
      subtitle,
      content,
      blogImage,
    });
    await newBlogPost.save();
    res.status(201).json({
      status: "success",
      newBlogPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);

    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "blog successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
