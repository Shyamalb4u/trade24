const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
// router.post("/touch/:id", userController.handleTouch);
// router.get("/getUser/:id", userController.getUser);
// router.post("/addSocial/:id/:typ", userController.handleSocial);
router.get("/getall", userController.getall);
router.post("/signup", userController.signup);
// router.post("/touchtap/:id/:score", userController.handleTouchTap);
//router.get("/price", userController.ibsPrice);

module.exports = router;
