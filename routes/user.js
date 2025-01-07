const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/getUser/:id", userController.getUser);
router.get("/getall", userController.getall);
router.post("/signup", userController.signup);
// router.post("/touchtap/:id/:score", userController.handleTouchTap);

module.exports = router;
