const PINPOINT = require("../models/pin-point-model");
const COMMENTS = require("../models/comments-model");

const { makeResponse, throwError } = require("../common/functions");
const { RESPONSE_STATUS, RESPONSE_MESSAGES } = require("../common/constants");

// service handelers ^_^

const addPinPoint = async (req, res) => {
  try {
    const { lat, lng, name, description, image, category, address } = req.body;
    const pinPoint = {
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

module.exports = {
  addPinPoint,
  deletePinPoint,
};
