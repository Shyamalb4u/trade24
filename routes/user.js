const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/getUser/:id", userController.getUser);
router.get("/getMail/:mail", userController.getMail);
router.get("/getDirecr/:uid", userController.getDirect);
router.get("/getDirectSummery/:uid", userController.getDirectSummery);
router.get("/getall", userController.getall);
router.post("/signup", userController.signup);
router.get("/getBank/:mail", userController.getBank);
router.post("/setBank", userController.bankUpdate);
// router.post("/touchtap/:id/:score", userController.handleTouchTap);

module.exports = router;
