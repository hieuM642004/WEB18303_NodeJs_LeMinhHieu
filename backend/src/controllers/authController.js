const authService = require("../services/auth");


class AuthController {
  static async registerUser(req, res) {
    try {
      await authService.registerUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      await authService.loginUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async requestRefreshToken(req, res) {
    try {
      await authService.requestRefreshToken(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async logOut(req, res) {
    try {
      await authService.logOut(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
