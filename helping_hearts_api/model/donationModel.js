const mongoose = require("mongoose");
const user = require("./userModel");

const donationSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    number: {
      type: Number,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    municipality: {
      type: String,
      required: false,
    },
    ward: {
      type: String,
      required: false,
    },
    wardNo: {
      type: Number,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    organizationName: {
      type: String,
      required: false,
    },
    itemsToDonate: {
      type: String,
      required: false,
    },
    categoryOfSupplies: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    preferredDate: {
      type: String,
      required: false,
    },
    preferredTime: {
      type: String,
      required: false,
    },
    donationMethod: {
      type: String,
      required: false,
    },
    imageOne: {
      type: String,
      required: false,
    },
    imageTwo: {
      type: String,
      required: false,
    },
    additionalInformation: {
      type: String,
      required: false,
    },

    donatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },

    donatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },

    isReceived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Donations = mongoose.model("donation", donationSchema);
module.exports = Donations;
