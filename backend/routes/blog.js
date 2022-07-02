const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

//Route-1: Get all blogs using GET "/api/blog/getblog". auth needed
router.get("/getblog", fetchuser, async (req, res) => {
  const blogs = await Blog.find({ user: req.user.id });
  res.json(blogs);
});

//Route-1B Get one specific blog with id
router.get("/getoneblog/:id", fetchuser, async (req, res) => {
  const blogs = await Blog.findOne({ user: req.user.id, _id:req.params.id });
  res.json(blogs);
});

//Route-2: Create a blog for specific user using GET "/api/blog/createblog". auth needed
router.post(
  "/createblog",
  fetchuser,
  [
    //Change min length to 25 in Production
    body("title", "Title is to Short").isLength({ min: 5 }),
    //Change min length to 200 in Production
    body("post", "post is to Short").isLength({ min: 5 }),
    body("categories", "Enter atleast one category").isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errormsg = errors.array();
        return res.status(400).json({ errors: errors.array(), msg: errormsg[0].msg });
      }
      const blog = new Blog({
        title: req.body.title,
        post: req.body.post,
        user: req.user.id,
        categories: req.body.categories,
      });
      const savedblog = await blog.save();
      // console.log(savedblog);
      res.json({ savedblog, msg: "Blog created",success:true });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Sever Error");
    }
  }
);

//Route-3: Update a blog for specific user using GET "/api/blog/createblog". auth needed
router.put("/updateblog/:id", fetchuser, async (req, res) => {
  const { title, post, categories } = req.body;
  const newBlog = {};
  if (title) {
    newBlog.title = title;
  }
  if (post) {
    newBlog.post = post;
  }
  if (categories) {
    newBlog.categories = categories;
  }

  try {
    //Find th blog to be updated and update it
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }
    // console.log(blog.user)
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true });
    res.json({ blog, msg: "Blog Updated",success:true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Sever Error");
  }
});
//Route-4: Delete a blog for specific user using GET "/api/blog/deleteblog". auth needed
router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    //Find th blog to be updated and update it
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }
    // Check for correct user
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ blog, msg: "Blog Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
