const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");



const keyFilePath = path.join(__dirname, "key.json")
const auth = new google.auth.JWT({
  keyFile: keyFilePath, 
  scopes: "https://www.googleapis.com/auth/drive", 
});


const drive = google.drive({ version: "v3", auth });


module.exports = { drive, auth };
