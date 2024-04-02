const { Author, Book } = require("../models/book");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const keyFilePath = path.join(__dirname, "key.json");
const auth = new google.auth.JWT({
  keyFile: keyFilePath,
  scopes: "https://www.googleapis.com/auth/drive",
});

const drive = google.drive({ version: "v3", auth });
class bookService {
  //ADD A BOOK
  static async addABook(req, res) {
    try {
      upload.fields([
        { name: "image", maxCount: 1 },
        { name: "pdfFile", maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Upload failed", error: err });
        }

        // Upload image to Google Drive
        const imageFile = req.files["image"][0];
        const imageMetadata = {
          name: imageFile.filename,
          parents: ["1TdIAHWTpH1eSejDLcJAF5nD65v_NQ38V"],
        };
        const imageMedia = {
          mimeType: imageFile.mimetype,
          body: fs.createReadStream(imageFile.path),
        };
        const imageResponse = await drive.files.create({
          resource: imageMetadata,
          media: imageMedia,
          fields: "id, webViewLink",
        });
        const imageUrl = imageResponse.data.webViewLink;
        const imageId = imageResponse.data.id;

        // Upload PDF file to Google Drive
        const pdfFile = req.files["pdfFile"][0];
        const pdfMetadata = {
          name: pdfFile.filename,
          parents: ["1TdIAHWTpH1eSejDLcJAF5nD65v_NQ38V"],
        };
        const pdfMedia = {
          mimeType: pdfFile.mimetype,
          body: fs.createReadStream(pdfFile.path),
        };
        const pdfResponse = await drive.files.create({
          resource: pdfMetadata,
          media: pdfMedia,
          fields: "id, webViewLink",
        });
        const pdfUrl = pdfResponse.data.webViewLink;
        const pdfId = pdfResponse.data.id;

        // Create a new book instance with uploaded image and pdf file
        const newBook = new Book({
          ...req.body,
          images: [`https://drive.google.com/thumbnail?id=${imageId}`],
          pdfUrl: pdfId,
        });
        // Save the new book to database
        const savedBook = await newBook.save();

        // If author ID is provided, update author's books array with new book ID
        if (req.body.author) {
          const author = await Author.findById(req.body.author);
          await author.updateOne({ $push: { books: savedBook._id } });
        }

        // Delete temporary files from server
        fs.unlinkSync(imageFile.path);
        fs.unlinkSync(pdfFile.path);

        // Return the saved book as JSON response
        res.status(200).json(savedBook);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //GET ALL BOOKS
  static async getAllBooks(req, res) {
    try {
      let query = {};
      let page = parseInt(req.query.page) || 1; 
      let limit = parseInt(req.query.limit) || 2; 
  
   
      if (req.query.search) {
        query = { name: { $regex: new RegExp(req.query.search, 'i') } };
      }
  
      
      const totalCount = await Book.countDocuments(query);
  
     
      const totalPages = Math.ceil(totalCount / limit);
  
     
      const skip = (page - 1) * limit;
  
    
      const book = await Book.find(query).skip(skip).limit(limit);
  
      res.status(200).json({ totalPages, totalCount, currentPage: page, book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //GET A BOOK
  static async getABook(req, res) {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //UPDATE BOOK
  static async updateBook(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //DELETE BOOK
  static async deleteBook(req, res) {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = bookService;
