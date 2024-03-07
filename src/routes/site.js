const express = require("express");
const router = express.Router();
const sideController = require("../app/controllers/SideController");

// sideController.index
router.get("/search", sideController.search);
router.get("/", sideController.index);
module.exports = router;
