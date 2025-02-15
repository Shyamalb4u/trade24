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
router.get("/getFundRequest/:mail", userController.getFundRequest);
router.get("/getFundBalance/:mail", userController.getFundBalance);
router.get("/getMyPackage/:mail", userController.getMyPackages);
router.get("/getExpDate/:mail", userController.getExpDate);
router.post("/setBank", userController.bankUpdate);
router.post("/fundRequest", userController.fundRequest);
router.post("/topup", userController.topup);

module.exports = router;
