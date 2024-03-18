const genresController = require("../controllers/genresController");



const router = require("express").Router();

//ADD A GENRE
router.post("/", genresController.addGenres);

//GET ALL GENRES
router.get("/", genresController.getAllGenress);

//GET A GENRE
router.get("/:id", genresController.getAnGenres);

//UPDATE A GENRE
router.put("/:id", genresController.updateGenres);

//DELETE A GENRE
router.delete("/:id", genresController.deleteGenres);

module.exports = router;