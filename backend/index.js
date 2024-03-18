const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv= require("dotenv");
const db = require("./src/config/db");
//Config socket
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server);

dotenv.config();
//Routes
const authorRouter = require("./src/routes/author");
const bookRouter = require("./src/routes/book");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const genresRouter = require("./src/routes/genres");
const postsRouter = require("./src/routes/posts");

//Connect to database
db.connect();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));
//Routes
app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);
app.use("/v1/auth",authRouter);
app.use("/v1/user",userRouter);
app.use("/v1/genres",genresRouter);
app.use("/v1/posts",postsRouter);
io.on("connection",(socket)=>{
console.log("User connected",socket.id);
})
app.listen(3000, () => {
  console.log("Server is running...");
});
// server.listen(9000, () => {
//   console.log("Server is running...");
// });
