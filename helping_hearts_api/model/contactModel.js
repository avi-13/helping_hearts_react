const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    number: {
      required: true,
      type: Number,
    },
    message: {
      required: true,
      type: String,
    },
    organization : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }

  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
