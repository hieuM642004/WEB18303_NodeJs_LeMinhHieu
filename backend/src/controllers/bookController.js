const bookService = require("../services/book");

class BookController {
  static async addABook(req, res) {
    try {
      await bookService.addABook(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBooks(req, res) {
    try {
      await bookService.getAllBooks(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getABook(req, res) {
    try {
      await bookService.getABook(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBook(req, res) {
    try {
      await bookService.updateBook(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBook(req, res) {
    try {
      await bookService.deleteBook(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookController;
