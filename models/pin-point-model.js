const db = require("../bin/db");

const pinPointSchema = new db.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { minimize: false, timestamps: true }
);

module.exports = db.model("pin-points", pinPointSchema, "pin-points");
