const Genres = require("../models/Genres");
const multer = require("multer");

class genresService {
  //ADD GENRES
  static async addGenres(req, res) {
    try {
      const newGenres = new Genres(req.body);
      const savedGenres = await newGenres.save();
      res.status(200).json(savedGenres);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  }

  //GET ALL GENRESS
  static async getAllGenress(req, res) {
    try {
      const genress = await Genres.find();
      res.status(200).json(genress);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //GET AN GENRES
 static async getAnGenres(req, res) {
    try {
      const genres = await Genres.findById(req.params.id);
      res.status(200).json(genres);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //UPDATE GENRES
  static async updateGenres(req, res) {
    try {
      const genres = await Genres.findById(req.params.id);
      await genres.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //DELETE GENRES
  static async deleteGenres(req, res) {
    
    try {
      await Genres.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = genresService;
