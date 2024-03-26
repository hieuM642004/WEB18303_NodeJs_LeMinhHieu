const { Author, Book } = require("../models/book");

class authorService {
  //ADD AUTHOR
  static async addAuthor(req, res) {
    try {
      const newAuthor = new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(200).json(savedAuthor);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  }

  //GET ALL AUTHORS
  static async getAllAuthors(req, res) {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //GET AN AUTHOR
  static async getAnAuthor(req, res) {
    try {
      const author = await Author.findById(req.params.id).populate("books");
      res.status(200).json(author);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //UPDATE AUTHOR
  static async updateAuthor(req, res) {
    try {
      const author = await Author.findById(req.params.id);
      await author.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //DELETE AUTHOR
  static async deleteAuthor(req, res) {
    try {
      await Book.updateMany({ author: req.params.id }, { author: null });
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = authorService;
