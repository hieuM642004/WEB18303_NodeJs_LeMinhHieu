const commentController = require("../../controllers/commentController");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log(`User connected ${socket.id}`);

    try {
      const comments = await commentController.getAllComments();
      socket.emit("All comments", comments);

      socket.on("Send_message", async (data) => {
        try {
          const comment = await commentController.addComment(data);
          io.emit("Received message", comment);
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      });

      socket.on("Edit_comment", async (data) => {
        try {
          console.log(data);
          const editedComment = await commentController.editComment(data);
          io.emit("Updated comment", editedComment);
        } catch (error) {
          console.error("Error editing comment:", error);
        }
      });

      socket.on("Delete_comment", async (data) => {
        try {
          console.log(data);
          const editedComment = await commentController.deleteComment(data);
          io.emit("Deleted comment", editedComment);
        } catch (error) {
          console.error("Error editing comment:", error);
        }
      });
    } catch (error) {
      console.error("Error getting all comments:", error);
    }
  });
};
