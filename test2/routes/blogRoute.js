const express=require('express')
const blogRouter=express.Router();
const blogController=require('../controllers/blogController')

blogRouter.get("/",blogController.test);
blogRouter.post("/blog",blogController.postBlog)
blogRouter.get("/blogs",blogController.getBlogs)
blogRouter.post("/comment",blogController.postComment)
blogRouter.post("/like",blogController.postLike);
blogRouter.delete("/like",blogController.deleteLike);


module.exports=blogRouter;