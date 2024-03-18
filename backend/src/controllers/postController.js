
const multer = require("multer");
const Posts = require("../models/Posts");


const postsController = {
  //ADD POSTS
  addPosts: async (req, res) => {
    try {
      const newPosts = new Posts(req.body);
      const savedPosts = await newPosts.save();
      res.status(200).json(savedPosts);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL POSTSS
  getAllPostss: async (req, res) => {
    try {
      const postss = await Posts.find();
      res.status(200).json(postss);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN POSTS
  getAnPosts: async (req, res) => {
    try {
      const posts = await Posts.findById(req.params.id);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE POSTS
  updatePosts: async (req, res) => {
    try {
      const posts = await Posts.findById(req.params.id);
      await posts.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE POSTS
  deletePosts: async (req, res) => {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = postsController;