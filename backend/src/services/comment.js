const Comment = require("../models/Comment");

class commentService {
  // ADD COMMENT
  static async addComment(data) {
    try {
      const newComment = new Comment(data);
      const savedComment = await newComment.save();
      return savedComment;
    } catch (err) {
      console.error("Error adding comment:", err);
      throw new Error("Failed to add comment");
    }
  }

  // GET ALL COMMENTS
  static async getAllComments() {
    try {
      const comments = await Comment.find();
      return comments;
    } catch (err) {
      console.error("Error getting all comments:", err);
      throw new Error("Failed to retrieve comments");
    }
  }
  static async editComment(data) {
    try {
      const { commentId, text, rating } = data;
      const editedComment = await Comment.findByIdAndUpdate(commentId, {
        text: text,
        rating: rating,
        edited: true,
      });
      return editedComment;
    } catch (err) {
      console.error("Error editing comment:", err);
      throw new Error("Failed to edit comment");
    }
  }
  static async deleteComment(data) {
    try {
      const { commentId } = data;
      const deleteComment = await Comment.findByIdAndDelete(commentId);
      return deleteComment;
    } catch (err) {
      console.error("Error editing comment:", err);
      throw new Error("Failed to edit comment");
    }
  }
}

module.exports = commentService;
