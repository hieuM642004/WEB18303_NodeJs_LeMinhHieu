const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./src/config/db");
//Config and using socket
const { Server } = require("socket.io");
const commentsWebSocket = require("./src/sockets/Comments/Comments");
dotenv.config();
//Routes
const authorRouter = require("./src/routes/author");
const bookRouter = require("./src/routes/book");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const genresRouter = require("./src/routes/genres");
const postsRouter = require("./src/routes/posts");
const premiumPackage = require("./src/routes/premium");
const commentPackage = require("./src/routes/comment");
const commentController = require("./src/controllers/commentController");

//Connect to database
db.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));
//Routes
app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/genres", genresRouter);
app.use("/v1/posts", postsRouter);
app.use("/v1/premium", premiumPackage);
app.use("/v1/comments", commentPackage);

const server = http.createServer(app);
const io = new Server(server, { cors: { 
  origin: "*",
 }
 });

// const httpProxy = require("http-proxy");

// httpProxy
//   .createProxyServer({
//     target: "http://localhost:5173/",
//     ws: true,
//   })
//   .listen(3001);

// app.listen(3000, () => {
//   console.log("Server is running...");
// });

// io.on("connection", (socket) => {
//   console.log(`User connected ${socket.id}`);

//   socket.on("Send_message", async (data) => {
//     try {
//     const comment=  await commentController.addComment(data);

//       io.emit("Received message", comment);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   });
// });
// io.on("connection", async (socket) => {
//   console.log(`User connected ${socket.id}`);

//   try {
//     const comments = await commentController.getAllComments();
//     socket.emit("All comments", comments);

//     socket.on("Send_message", async (data) => {
//       try {
//         const comment = await commentController.addComment(data);
//         io.emit("Received message", comment);
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     });

//     socket.on("Edit_comment", async (data) => {
//       try {
//         console.log(data);
//         const editedComment = await commentController.editComment(data);
//         io.emit("Updated comment", editedComment);
//       } catch (error) {
//         console.error("Error editing comment:", error);
//       }
//     });
//     socket.on("Delete_comment", async (data) => {
//       try {
//         console.log(data);
//         const editedComment = await commentController.deleteComment(data);
//         io.emit("Deleted comment", editedComment);
//       } catch (error) {
//         console.error("Error editing comment:", error);
//       }
//     });
//   } catch (error) {
//     console.error("Error getting all comments:", error);
//   }
// });
commentsWebSocket(io);
server.listen(3001, () => {
  console.log("Server is running...");
});
