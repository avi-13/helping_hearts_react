const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    number: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },

    organizationName: {
      type: String,
      required: false,
    },

    organizationEmail: {
      type: String,
      required: false,
    },

    registrationNumber: {
      type: String,
      required: false,
    },
    // address Information
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

    organizationType: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isOrganization: {
      type: Boolean,
      default: false,
    },
    headOfOrganization: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    headNumber: {
      type: Number,
      required: false,
    },
    headEmail: {
      type: String,
      required: false,
    },
    totalResidents: {
      type: Number,
      required: false,
    },
    ageRange: {
      type: String,
      required: false,
    },
    numberOfStaff: {
      type: Number,
      required: false,
    },
    mission: {
      type: String,
      required: false,
    },
    vision: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },

    registrationCertificate: {
      type: String,
      required: false,
      trim: false,
      default:
        "https://res.cloudinary.com/dm7yesms2/image/upload/v1708584317/Users/cq2ndw5yfe3sh4eceleq",
    },
    license: {
      type: String,
      required: false,
      trim: false,
      default:
        "https://res.cloudinary.com/dm7yesms2/image/upload/v1708584317/Users/cq2ndw5yfe3sh4eceleq",
    },
    proofOfAddress: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dm7yesms2/image/upload/v1708584317/Users/cq2ndw5yfe3sh4eceleq",
      trim: false,
    },
    description: {
      required: false,
      type: String,
    },

    socialMediaLinks: {
      type: String,
      required: false,
    },

    latitude: {
      required: false,
      type: Number,
    },
    longitude: {
      required: false,
      type: Number,
    },

    userImageUrl: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dm7yesms2/image/upload/v1708584317/Users/cq2ndw5yfe3sh4eceleq",
      trim: false,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
