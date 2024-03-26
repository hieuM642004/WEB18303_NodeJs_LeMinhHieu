const postsService = require("../services/posts");

class postsController {
  //ADD POSTS
  static async addPosts(req, res) {
    try {
      await postsService.addPosts(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //GET ALL POSTS
  static async getAllPostss(req, res) {
    try {
      await postsService.getAllPostss(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //GET AN POST
  static async getAnPosts(req, res) {
    try {
      await postsService.getAnPosts(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //UPDATE POSTS
  static async updatePosts(req, res) {
    try {
      await postsService.updatePosts(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //DELETE POSTS
  static async deletePosts(req, res) {
    try {
      await postsService.deletePosts(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = postsController;
