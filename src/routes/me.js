const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

// meController.index
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);


module.exports = router;
