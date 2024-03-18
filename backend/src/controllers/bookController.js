const { Author, Book } = require("../models/book");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

const multer = require("multer");


const upload = multer({ dest: "uploads/" });

const keyFilePath = path.join(__dirname, "key.json")
const auth = new google.auth.JWT({
  keyFile: keyFilePath, 
  scopes: "https://www.googleapis.com/auth/drive", 
});


const drive = google.drive({ version: "v3", auth });
const bookController = {
  //ADD A BOOK
  addABook: async (req, res) => {
    try {
      upload.single("image")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Upload image failed", error: err });
        }
        
        const fileMetadata = {
          name: req.file.filename, // Sử dụng tên file tải lên làm tên của tệp trên Google Drive
          parents: ["1TdIAHWTpH1eSejDLcJAF5nD65v_NQ38V"], 
        };

        const media = {
          mimeType: "image/jpeg",
          body: fs.createReadStream(req.file.path),
        };

        const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webViewLink", 
        });

        const imageUrl = response.data.webViewLink;
        const imageId = response.data.id; 
        const newBook = new Book({
          ...req.body,
          images: [`https://drive.google.com/thumbnail?id=${imageId}`],
        });

        const savedBook = await newBook.save();
        if (req.body.author) {
          const author = await Author.findById(req.body.author);
          await author.updateOne({ $push: { books: savedBook._id } });
        }

        fs.unlinkSync(req.file.path);

        res.status(200).json(savedBook);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL BOOKS
  getAllBooks: async (req, res) => {
    try {
      let query = {};

    
      if (req.query.search) {
       
        query = { name: { $regex: new RegExp(req.query.search, 'i') } };
      }
  
    
      const allBooks = await Book.find(query);
      res.status(200).json(allBooks);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A BOOK
  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE BOOK
  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE BOOK
  deleteBook: async (req, res) => {
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
  },
};

module.exports = bookController;