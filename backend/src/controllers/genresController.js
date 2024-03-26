const genresService = require("../services/genres");

class GenresController {
  static async addGenres(req, res) {
    try {
      await genresService.addGenres(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllGenress(req, res) {
    try {
      await genresService.getAllGenress(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAnGenres(req, res) {
    try {
      await genresService.getAnGenres(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateGenres(req, res) {
    try {
      await genresService.updateGenres(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteGenres(req, res) {
    try {
      await genresService.deleteGenres(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GenresController;
