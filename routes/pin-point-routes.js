const express = require("express");
const router = express.Router();

const pinPointServices = require("../services/pin-point-services");
const { formidableMiddleware } = require("../common/middlewares");

/* GET home page. */
router.post("/add", formidableMiddleware, pinPointServices.addPinPoint);
router.post("/delete", pinPointServices.deletePinPoint);
// router.post("/get", formidableMiddleware, pinPointServices.getPinPoint);
router.get("/get", pinPointServices.getPinPoint);
router.get("/get-all", pinPointServices.getAllPinPoints);

module.exports = router;
