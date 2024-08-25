const express = require("express");
const router = express.Router();

const pinPointServices = require("../services/pin-point-services");

/* GET home page. */
router.post("/add", pinPointServices.addPinPoint);
router.post("/delete", pinPointServices.deletePinPoint);

module.exports = router;
