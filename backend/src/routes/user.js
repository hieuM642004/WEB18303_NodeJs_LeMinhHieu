const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/",userController.getAllUsers);
router.get("/:id",userController.getAUsers); 
router.post("/:id",userController.addFollow); 
router.put("/:id",userController.editUser); 
router.delete("/:id/unfollow",userController.unFollow); 
//DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;