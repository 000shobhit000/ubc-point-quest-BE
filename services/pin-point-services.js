const PINPOINT = require("../models/pin-point-model");
const COMMENTS = require("../models/comments-model");

const { makeResponse, throwError } = require("../common/functions");
const { RESPONSE_STATUS, RESPONSE_MESSAGES } = require("../common/constants");
const { request } = require("express");

// service handelers ^_^

const addPinPoint = async (req, res) => {
  try {
    const { markerId, lat, lng, name, description, image, category, address } = req.body;
    const pinPoint = {
      markerId,
      lat,
      lng,
      name,
      description,
      image,
      category,
      address,
    };
    const savedPinPoint = await PINPOINT.create(pinPoint);

    if (savedPinPoint) {
      return makeResponse(
        res,
        RESPONSE_STATUS.CREATED,
        true,
        RESPONSE_MESSAGES.REGISTER_SUCCESS,
        savedPinPoint
      );
    }
    return throwError(
      RESPONSE_STATUS.BAD_REQUEST,
      "Error in adding PinPoint: "
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in addPinPoint api: " + error,
      undefined
    );
  }
};

const addManyPinPoints = async (req, res) => {
  console.log("!!!!!!!!!!!!!")
  // if (!req.body || req.body.length === 0) {
  //   return throwError(
  //     RESPONSE_STATUS.BAD_REQUEST,
  //     "Error in adding PinPoint: empty body received"

  //   );
  // }

  // try {
  //   for (const marker of req.body) {
  //     console.log(marker);
    
  //   }
  //   // const { markerId, lat, lng, name, description, image, category, address } = req.marker;
  //   // const pinPoint = {
  //   //   markerId,
  //   //   lat,
  //   //   lng,
  //   //   name,
  //   //   description,
  //   //   image,
  //   //   category,
  //   //   address,
  //   // };
  //   // const savedPinPoint = await PINPOINT.create(pinPoint);

  //   // if (savedPinPoint) {
      return makeResponse(
        res,
        RESPONSE_STATUS.CREATED,
        true,
        RESPONSE_MESSAGES.REGISTER_SUCCESS,
        // savedPinPoint
      );
  //   // }
  //   // return throwError(
  //   //   RESPONSE_STATUS.BAD_REQUEST,
  //   //   "Error in adding PinPoint: "
  //   // );
  // } catch (error) {
  //   console.log(error);
  //   return makeResponse(
  //     res,
  //     RESPONSE_STATUS.SERVER_ERROR,
  //     false,
  //     "Error in addPinPoint api: " + error,
  //     undefined
  //   );
  // }
};


const deletePinPoint = async (req, res) => {
  try {
    const { pinPointId } = req.body;
    const deletedPinPoint = await PINPOINT.findByIdAndDelete(pinPointId);
    if (deletedPinPoint) {
      return makeResponse(
        res,
        RESPONSE_STATUS.SUCCESS,
        true,
        RESPONSE_MESSAGES.SUCCESS,
        deletedPinPoint
      );
    }
    return throwError(
      RESPONSE_STATUS.NOT_FOUND,
      "Error in deleting PinPoint: "
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in deletePinPoint api: " + error,
      undefined
    );
  }
};

const deleteAllPinPoints = async (req, res) => {
  try {
    // const { pinPointId } = req.body;
    // const deletedPinPoint = await PINPOINT.findByIdAndDelete(pinPointId);
    // if (deletedPinPoint) {
    //   return makeResponse(
    //     res,
    //     RESPONSE_STATUS.SUCCESS,
    //     true,
    //     RESPONSE_MESSAGES.SUCCESS,
    //     deletedPinPoint
    //   );
    // }
    // return throwError(
    //   RESPONSE_STATUS.NOT_FOUND,
    //   "Error in deleting PinPoint: "
    // );
    const result = await PINPOINT.deleteMany({});
    console.log(result);
    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      deleteAllPinPoints
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in deletePinPoint api: " + error,
      undefined
    );
  }
};

const getPinPoint = async (req, res) => {
  try {
    const { pinPointId } = req.query;
    const fetchedPP = await PINPOINT.findById(pinPointId);
    if (!fetchedPP) {
      return throwError(
        RESPONSE_STATUS.NOT_FOUND,
        "Error in fetching PinPoint: "
      );
    }
    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      fetchedPP
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in getPinPoint api: " + error,
      undefined
    );
  }
};

const getAllPinPoints = async (req, res) => {
  try {
    const fetchedPP = await PINPOINT.find();
    console.log(fetchedPP);
    
    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      fetchedPP
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in getAllPinPoints api: " + error,
      undefined
    );
  }
};

module.exports = {
  addPinPoint,
  deletePinPoint,
  getPinPoint,
  getAllPinPoints,
  deleteAllPinPoints,
  addManyPinPoints
};