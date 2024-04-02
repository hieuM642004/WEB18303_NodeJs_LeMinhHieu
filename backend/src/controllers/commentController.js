const commentService = require("../services/comment");

class commentController {
  // ADD COMMENT
  static async addComment(data) {
    try {
      const comment = await commentService.addComment(data);
      return comment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw new Error("Failed to add comment");
    }
  }

  // GET ALL COMMENTS
  static async getAllComments() {
    try {
      const comments = await commentService.getAllComments();
      return comments;
    } catch (error) {
      console.error("Error getting all comments:", error);
      throw new Error("Failed to retrieve comments");
    }
  }
  // EDIT COMMENT
  static async editComment(data) {
    try {
      await commentService.editComment(data);
    } catch (error) {
      console.error("Error getting all comments:", error);
      throw new Error("Failed to retrieve comments");
    }
  }
  // DELETE COMMENT
  static async deleteComment(data) {
    try {
      await commentService.deleteComment(data);
    } catch (error) {
      console.error("Error getting all comments:", error);
      throw new Error("Failed to retrieve comments");
    }
  }
}

module.exports = commentController;
