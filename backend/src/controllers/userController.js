const userService = require("../services/user");



class userController {
  //GET ALL USERS
  static async getAllUsers(req, res) {
    try {
      await userService.getAllUsers(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //GET A USER
  static async getAUsers(req, res) {
    try {
      await userService.getAUsers(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //EDIT A USER
  static async editUser(req, res) {
    try {
      await userService.editUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //DELETE A USER
  static async deleteUser(req, res) {
    try {
      await userService.deleteUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //ADD HASFOLLOW
  static async addFollow(req, res) {
    try {
      await userService.addFollow(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //REMOVE HASFOLLOW
  static async unFollow(req, res) {
    try {
      await userService.unFollow(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = userController;
