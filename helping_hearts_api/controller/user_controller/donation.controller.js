const cloudinary = require("cloudinary");
const Donation = require("../../model/donationModel");
const addDonation = async (req, res) => {
  console.log(req.body);
  const { imageOne, imageTwo } = req.files;

  if (!imageOne || !imageTwo) {
    return res.json({
      success: false,
      message: "Please upload at least one image",
    });
  }

  const {
    fullName,
    username,
    email,
    number,
    state,
    district,
    municipality,
    ward,
    wardNo,
    area,
    latitude,
    longitude,
    organizationName,
    itemsToDonate,
    categoryOfSupplies,
    quantity,
    description,
    preferredDate,
    preferredTime,
    donationMethod,
    additionalInformation,
    donatedBy,
    donatedTo,
  } = req.body;

  if (
    !fullName ||
    !username ||
    !email ||
    !number ||
    !state ||
    !district ||
    !municipality ||
    !ward ||
    !wardNo ||
    !area ||
    !latitude ||
    !longitude ||
    !organizationName ||
    !itemsToDonate ||
    !categoryOfSupplies ||
    !quantity ||
    !description ||
    !preferredDate ||
    !preferredTime ||
    !donationMethod ||
    !donatedBy ||
    !donatedTo
  ) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const uploadImageOne = await cloudinary.v2.uploader.upload(imageOne.path, {
      folder: "Donations",
      crop: "scale",
    });
    const uploadImageTwo = await cloudinary.v2.uploader.upload(imageTwo.path, {
      folder: "Donations",
      crop: "scale",
    });

    const newDonation = new Donation({
      fullName: fullName,
      username: username,
      email: email,
      number: number,
      state: state,
      district: district,
      municipality: municipality,
      ward: ward,
      wardNo: wardNo,
      area: area,
      latitude: latitude,
      longitude: longitude,
      organizationName: organizationName,
      itemsToDonate: itemsToDonate,
      categoryOfSupplies: categoryOfSupplies,
      quantity: quantity,
      description: description,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      donationMethod: donationMethod,
      additionalInformation: additionalInformation,
      donatedBy: donatedBy,
      donatedTo: donatedTo,
      imageOne: uploadImageOne.secure_url,
      imageTwo: uploadImageTwo.secure_url,
    });
    await newDonation.save();
    return res
      .status(201)
      .json({ success: true, message: "Donation added successfully " });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getDonationByUserId = async (req, res) => {
  const id = req.params.id;
  console.log(id)

  try {
    const userRequests = await Donation.find({ donatedBy: id }).sort({
      createdAt: -1,
    });
    const donatedToRequests = await Donation.find({ donatedTo: id }).sort({
      createdAt: -1,
    });
    console.log("donatedToRequests",donatedToRequests);

    res.status(200).json({
      success: true,
      userDonation: userRequests,
      donatedToRequests: donatedToRequests,
      message: "Requests found successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateRequest = async (req, res) => {
  const { imageOne, imageTwo } = req.files;

  if (!imageOne || !imageTwo) {
    return res.json({
      success: false,
      message: "Please upload at least one image",
    });
  }

  const {
    fullName,
    username,
    email,
    number,
    state,
    district,
    municipality,
    ward,
    wardNo,
    area,
    latitude,
    longitude,
    organizationName,
    itemsToDonate,
    categoryOfSupplies,
    quantity,
    description,
    preferredDate,
    preferredTime,
    donationMethod,
    additionalInformation,
  } = req.body;

  const id = req.params.id;

  // validation
  if (
    !fullName ||
    !username ||
    !email ||
    !number ||
    !state ||
    !district ||
    !municipality ||
    !ward ||
    !wardNo ||
    !area ||
    !latitude ||
    !longitude ||
    !organizationName ||
    !itemsToDonate ||
    !categoryOfSupplies ||
    !quantity ||
    !description ||
    !preferredDate ||
    !preferredTime ||
    !donationMethod
  ) {
    return res.json({
      success: false,
      message: "Cannot be empty",
    });
  }

  try {
    const uploadImageOne = await cloudinary.v2.uploader.upload(imageOne.path, {
      folder: "Donations",
      crop: "scale",
    });
    const uploadImageTwo = await cloudinary.v2.uploader.upload(imageTwo.path, {
      folder: "Donations",
      crop: "scale",
    });

    const updatedRequest = {
      fullName: fullName,
      username: username,
      email: email,
      number: number,
      state: state,
      district: district,
      municipality: municipality,
      ward: ward,
      wardNo: wardNo,
      area: area,
      latitude: latitude,
      longitude: longitude,
      organizationName: organizationName,
      itemsToDonate: itemsToDonate,
      categoryOfSupplies: categoryOfSupplies,
      quantity: quantity,
      description: description,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      donationMethod: donationMethod,
      additionalInformation: additionalInformation,
      imageOne: uploadImageOne.secure_url,
      imageTwo: uploadImageTwo.secure_url,
    };
    await Donation.findByIdAndUpdate(id, updatedRequest);
    res.json({
      success: true,
      message: "Request Updated Successfully",
      requestblood: updatedRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const deletedRequest = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.json({
        success: false,
        message: "Request Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Request Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSingleDonation = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "Invalid request ID",
    });
  }

  try {
    const singleRequest = await Donation.findById(id).populate("userId");

    if (!singleRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const user = singleRequest.userId;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given request",
      });
    }

    res.status(200).json({
      success: true,
      message: "",
      donation: {
        ...singleRequest._doc,
        user: {
          userId: user._id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addDonation,
  getDonationByUserId,
  updateRequest,
  deleteDonation,
  getSingleDonation,
};
