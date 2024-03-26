const User = require("../models/User");

class userService {
  //GET ALL USER
  static async getAllUsers(req, res) {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //GET A USER
  static async getAUsers(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //DELETE A USER
  static async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //add hasFollow
  static async addFollow(req, res) {
    try {
      const idUser = req.params.id;
      await User.findByIdAndUpdate(idUser, {
        $push: { hasFollow: req.body.hasFollow },
      });
      res.status(200).json("User has follow");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //remove hasFollow
  static async unFollow(req, res) {
    try {
      const idUser = req.params.id;
      await User.findByIdAndUpdate(idUser, {
        $pull: { hasFollow: req.body.hasFollow },
      });
      res.status(200).json("User has unfollow");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = userService;
