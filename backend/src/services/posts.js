const multer = require("multer");
const Posts = require("../models/Posts");

class postsService {
  //ADD POSTS
  static async addPosts(req, res) {
    try {
      const newPosts = new Posts(req.body);
      const savedPosts = await newPosts.save();
      res.status(200).json(savedPosts);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  }

  //GET ALL POSTS
  static async getAllPostss(req, res) {
    try {
      const postss = await Posts.find();
      res.status(200).json(postss);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //GET AN POST
  static async getAnPosts(req, res) {
    try {
      const posts = await Posts.findById(req.params.id);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //UPDATE POSTS
  static async updatePosts(req, res) {
    try {
      const posts = await Posts.findById(req.params.id);
      await posts.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //DELETE POSTS
  static async deletePosts(req, res) {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = postsService;
