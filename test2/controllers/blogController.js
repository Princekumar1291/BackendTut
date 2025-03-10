const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

exports.test = (req, res) => {
  res.send("Hello");
};

module.exports.postBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const response = await Blog.create({ title, body });
    res.status(200).json({
      success: true,
      data: response,
      message: "Post added"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding the data"
    })
  }
}

module.exports.getBlogs = async (req, res) => {
  try {
    let response = await Blog.find();
    res.status(200).json({
      success: true,
      data: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching the data",
      error: error.message
    })
  }
}


module.exports.postComment = async (req, res) => {
  try {
    const { blog, user, body } = req.body;
    const post = await Blog.findById(blog);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    const response = await Comment.create({ blog, user, body });
    post.comments.push(response._id);
    await post.save();
    await post.populate("comments")
    res.status(200).json({
      success: true,
      data: response,
      message: "Comment added",
      post: post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding the comment",
      error: error.message
    })
  }

}

module.exports.postLike = async (req, res) => {
  try {
    const { blog, user } = req.body;
    const newBlog = await Blog.findById(blog);
    if (!newBlog) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist"
      })
    }
    const response = await Like.create({ blog, user });
    newBlog.likes.push(response._id);
    await newBlog.save();
    await newBlog.populate(["likes", "comments"]);
    res.status(200).json({
      success: true,
      post: newBlog,
      message: "Like added successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding the like",
      error: error.message
    });
  }
}

module.exports.deleteLike = async (req, res) => {
  try {
    const {blog, user } = req.body;
    const response = await Like.findOneAndDelete({ _id:blog })
    res.status(200).json({
      success: true,
      data: response,
      message: "Like deleted successfully"
    })
    console.log(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting the like",
      error: error.message
    });
  }
}