const authorService = require("../services/author");


class AuthorController {
  static async addAuthor(req, res) {
    try {
      await authorService.addAuthor(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllAuthors(req, res) {
    try {
      await authorService.getAllAuthors(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAnAuthor(req, res) {
    try {
      await authorService.getAnAuthor(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateAuthor(req, res) {
    try {
      await authorService.updateAuthor(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      await authorService.deleteAuthor(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthorController;
