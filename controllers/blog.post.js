const BlogPost = require("../models/blog.post");
const cloudinary = require("../utils/cloudinary");

exports.createBlogPost = async (req, res) => {
  let path = "";
  try {
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path = path + singleFile.path + ",";
          });
        } else {
          path = path + file.path + ",";
        }
      });
      path = path.substring(0, path.lastIndexOf(","));
    }
    const { title, subtitle, content } = req.body;

    const newBlogPost = new BlogPost({
      title,
      subtitle,
      content,
      imageUrl: path,
    });

    await newBlogPost.save();

    res.status(201).json({
      status: "success",
      newBlogPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
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
