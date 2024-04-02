const commentController = require("../controllers/commentController");

const router = require("express").Router();

router.post("/", commentController.addComment);
router.get("/", commentController.getAllComments);
router.put("/", commentController.editComment);
router.delete("/", commentController.deleteComment);
module.exports = router;
