const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

const multer = require("multer");
const User = require("../models/User");

const upload = multer({ dest: "uploads/" });

const keyFilePath = path.join(__dirname, "key.json");
const auth = new google.auth.JWT({
  keyFile: keyFilePath,
  scopes: "https://www.googleapis.com/auth/drive",
});

const drive = google.drive({ version: "v3", auth });
class authService {
  //REGISTER
  static async registerUser(req, res) {
    try {
      upload.single("avatar")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Upload failed", error: err });
        }

        if (!req.file) {
          return res.status(400).json({ message: "No avatar uploaded" });
        }

        const avatarFile = req.file;
        const avatarMetadata = {
          name: avatarFile.filename,
          parents: ["1TdIAHWTpH1eSejDLcJAF5nD65v_NQ38V"],
        };
        const avatarMedia = {
          mimeType: avatarFile.mimetype,
          body: fs.createReadStream(avatarFile.path),
        };
        const avatarResponse = await drive.files.create({
          resource: avatarMetadata,
          media: avatarMedia,
          fields: "id",
        });
        const avatarId = avatarResponse.data.id;

        const avatarUrl = `https://drive.google.com/thumbnail?id=${avatarId}`;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashed,
          avatar: avatarUrl,
        });

        const user = await newUser.save();

        fs.unlinkSync(avatarFile.path);

        res.status(200).json(user);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      "Jw5Zm3Kx9LpR",
      { expiresIn: "10d" }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      "S4dEh9Gc6FqW",
      { expiresIn: "365d" }
    );
  }

  //LOGIN
  static async loginUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = authService.generateAccessToken(user);
        //Generate refresh token
        const refreshToken = authService.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async requestRefreshToken(req, res) {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, "S4dEh9Gc6FqW", (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authService.generateAccessToken(user);
      const newRefreshToken = authService.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  }

  //LOG OUT
  static async logOut(req, res) {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  }
}

module.exports = authService;
