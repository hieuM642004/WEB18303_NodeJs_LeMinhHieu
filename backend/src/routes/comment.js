const commentController = require("../controllers/commentController");

const router = require("express").Router();

router.post("/",commentController.addComment)
router.get("/",commentController.getAllComments)
module.exports=router