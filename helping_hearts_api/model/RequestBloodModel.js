const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: false,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    wardNo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    organizationType: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    itemsToDonate: {
      type: String,
      required: false,
    },
    categoryofSupplies: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    showRequest: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const RequestBlood = mongoose.model("requestblood", RequestSchema);
module.exports = RequestBlood;
