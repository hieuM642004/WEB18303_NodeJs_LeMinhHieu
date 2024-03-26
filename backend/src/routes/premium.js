const premiumController = require("../controllers/premiumController");

const router = require("express").Router();

//ADD A PREMIUM  PACKAGE
router.post("/register", premiumController.addPremium);
// router.post("/create_payment_url", premiumController.createPaymentUrl);
// router.get("/vnpay_ipn", premiumController.vnpayIpn);
// router.get("/vnpay_return", premiumController.vnpayReturn);
//GET ALL POSTS
// router.get("/", postsController.getAllPostss);

// //GET A GENRE
// router.get("/:id", postsController.getAnPosts);

// //UPDATE A GENRE
// router.put("/:id", postsController.updatePosts);

// //DELETE A GENRE
// router.delete("/:id", postsController.deletePosts);

module.exports = router;
