const db = require("../bin/db");

const pinPointSchema = new db.Schema(
  {
    markerId: {
      type: String,
      // required: true,
      // index: true
    },
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
    },
    category: [
      {
      type: String,
      }
    ],
    address: {
      type: String,
    },
  },
  { minimize: false, timestamps: true }
);

module.exports = db.model("pin-points", pinPointSchema, "pin-points");
