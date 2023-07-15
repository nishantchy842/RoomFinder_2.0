const mongoose = require("mongoose");
const roomSchema = mongoose.Schema(
  {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    price: { type: Number, min: 1000, required: true },
    title: { type: String, required: true, minLength: 5, maxLength: 150 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    address: { type: String, required: true },
    place: { type: String },
    amenities: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length >= 0,
    },
    img_collection: [Object],
    uid: { type: String, required: true },
    uName: { type: String, required: true },
    uEmail: { type: String, required: true },
    uPhone: { type: String, required: true },
    uPhoto: { type: String, default: "" },
    appliedCandidates: {
      type: [],
      required: true,
    },
    payment: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
