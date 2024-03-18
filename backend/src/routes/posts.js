const postsController = require("../controllers/postController");



const router = require("express").Router();

//ADD A GENRE
router.post("/", postsController.addPosts);

//GET ALL POSTS
router.get("/", postsController.getAllPostss);

//GET A GENRE
router.get("/:id", postsController.getAnPosts);

//UPDATE A GENRE
router.put("/:id", postsController.updatePosts);

//DELETE A GENRE
router.delete("/:id", postsController.deletePosts);

module.exports = router;