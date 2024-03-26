const Comment = require("../models/Comment");

class commentService {
  // ADD COMMENT
  static async addComment(data) {
    try {
      const newComment = new Comment(data);
      const savedComment = await newComment.save();
      return savedComment;
    } catch (err) {
      console.error('Error adding comment:', err);
      throw new Error('Failed to add comment');
    }
  }

  // GET ALL COMMENTS
  static async getAllComments() {
    try {
      const comments = await Comment.find();
      return comments;
    } catch (err) {
      console.error('Error getting all comments:', err);
      throw new Error('Failed to retrieve comments');
    }
  }
}

module.exports = commentService;
