const premiumService = require("../services/premium");

class premiumController {
  static async addPremium(req, res) {
    try {
      await premiumService.addPremium(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getAllPremium(req, res) {
    try {
      await premiumService.getAllPremium(req, res);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = premiumController;
