const BloodBanks = require("../../model/donationModel.js");
const cloudinary = require("cloudinary");
const User = require("../../model/userModel.js");
const bcrypt = require("bcrypt");
const { sendEmailController } = require("../sendEmailController.js");

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyz.ABCDEFGHIJKLMNOPQRS.TUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

const registerOrganization = async (req, res) => {
  const {
    organizationName,
    organizationEmail,
    registrationNumber,
    state,
    district,
    municipality,
    ward,
    wardNo,
    area,
    orphanageContactNumber,
    organizationType,
    headOfOrganization,
    position,
    headNumber,
    headEmail,
    totalResidents,
    ageRange,
    numberOfStaff,
    mission,
    vision,
    description,
    socialMediaLinks,
    latitude,
    longitude,
  } = req.body;

  if (
    !req.files
    // ||
    // !req.files.registrationCertificate ||
    // !req.files.license ||
    // !req.files.proofOfAddress ||
    // !req.files.userImageUrl
  ) {
    return res.json({
      success: false,
      message: "Please upload a valid image",
    });
  }

  if (
    !organizationName ||
    !organizationEmail ||
    !orphanageContactNumber ||
    !registrationNumber ||
    !state ||
    !district ||
    !municipality ||
    !ward ||
    !wardNo ||
    !area ||
    !organizationType ||
    !headOfOrganization ||
    !position ||
    !headNumber ||
    !headEmail ||
    !totalResidents ||
    !ageRange ||
    !numberOfStaff ||
    !socialMediaLinks ||
    !latitude ||
    !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields ",
    });
  }

  const { registrationCertificate, license, proofOfAddress, userImageUrl } =
    req.files;

  try {
    const uploadProfileImage = await cloudinary.v2.uploader.upload(
      userImageUrl.path,
      {
        folder: "Users",
        crop: "scale",
      }
    );
    const uploadedRefCertificate = await cloudinary.v2.uploader.upload(
      registrationCertificate.path,
      {
        folder: "Organizations",
        crop: "scale",
      }
    );
    const uploadedLicense = await cloudinary.v2.uploader.upload(license.path, {
      folder: "Organizations",
      crop: "scale",
    });
    const uploadedProofOfAddress = await cloudinary.v2.uploader.upload(
      proofOfAddress.path,
      {
        folder: "Organizations",
        crop: "scale",
      }
    );

    const randomPassword = generateRandomPassword(8);
    const generateSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, generateSalt);
    console.log(randomPassword);

    // Create User Account for Helping Hearts
    const defaultEmail = `${organizationName
      .replace(/\s+/g, "")
      .toLowerCase()}@helpinghearts.com`;

    console.log("Default Email:", defaultEmail);

    const username =
      organizationName.replace(/\s+/g, "").toLowerCase() + "-helpinghearts";

    const newOrganization = new User({
      organizationName: organizationName,
      email: organizationEmail,
      registrationNumber: registrationNumber,
      number: orphanageContactNumber,
      username: username,
      state: state,
      district: district,
      municipality: municipality,
      ward: ward,
      totalResidents: totalResidents,
      wardNo: wardNo,
      area: area,
      organizationType: organizationType,
      headOfOrganization: headOfOrganization,
      position: position,
      headNumber: headNumber,
      headEmail: headEmail,
      totalResidents: totalResidents,
      ageRange: ageRange,
      numberOfStaff: numberOfStaff,
      mission: mission,
      isOrganization: true,
      vision: vision,
      description: description,
      socialMediaLinks: socialMediaLinks,
      latitude: latitude,
      longitude: longitude,
      registrationCertificate: uploadedRefCertificate.secure_url,
      license: uploadedLicense.secure_url,
      proofOfAddress: uploadedProofOfAddress.secure_url,
      userImageUrl: uploadProfileImage.secure_url,
      password: hashedPassword,
    });

    await sendEmailController(
      headEmail,
      `Your ${organizationType} Account Details`,
      `Your Organization email is: ${organizationEmail} and Password is: ${randomPassword}`
    ).then(async (success) => {
      if (success) {
        await newOrganization.save();
        res.status(200).json({
          success: true,
          message: "Registration Successful. ",
        });
      } else {
        res.json({
          success: false,
          message: "Failed to send email. Please Enter a valid Email",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ?? "Server Error",
    });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const allOrgs = await User.find({
      $and: [
        { isOrganization: true },
        { organizationType: "orphanage" },
        { organizationType: "oldagehome" },
      ],
    });

    const allOrphanages = await User.find({
      $and: [{ isOrganization: true }, { organizationType: "orphanage" }],
    });

    const allOldAgeHomes = await User.find({
      $and: [{ isOrganization: true }, { organizationType: "oldagehome" }],
    });

    const fewOrphanages = allOrphanages.slice(0, 4);
    const fewHomes = allOldAgeHomes.slice(0, 4);

    res.json({
      success: true,
      message: "Fetched",
      allOrgs: allOrgs,
      allOrphanages: allOrphanages,
      allOldAgeHomes: allOldAgeHomes,
      fewOrphanages: fewOrphanages,
      fewHomes: fewHomes,
    });
  } catch (error) {
    res.json(error);
  }
};

const getOrgById = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await User.findById(id);
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    res.status(200).json({
      success: true,
      organization: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateOrganization = async (req, res) => {
  const organizationId = req.params.id;
  console.log(req.body, req.files)
  console.log(organizationId)
  const {
    organizationName,
    organizationEmail,
    registrationNumber,
    state,
    district,
    municipality,
    ward,
    wardNo,
    area,
    orphanageContactNumber,
    organizationType,
    headOfOrganization,
    position,
    headNumber,
    headEmail,
    totalResidents,
    ageRange,
    numberOfStaff,
    mission,
    vision,
    description,
    socialMediaLinks,
    latitude,
    longitude,
  } = req.body;

  if (
    !organizationName ||
    !organizationEmail ||
    !orphanageContactNumber ||
    !registrationNumber ||
    !state ||
    !district ||
    !municipality ||
    !ward ||
    !wardNo ||
    !area ||
    !organizationType ||
    !headOfOrganization ||
    !position ||
    !headNumber ||
    !headEmail ||
    !totalResidents ||
    !ageRange ||
    !numberOfStaff ||
    !socialMediaLinks ||
    !latitude ||
    !longitude
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all required fields.",
    });
  }

  try {
    const organization = await User.findById(organizationId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found.",
      });
    }

    const updateData = {
      organizationName,
      email: organizationEmail,
      registrationNumber,
      number: orphanageContactNumber,
      state,
      district,
      municipality,
      ward,
      wardNo,
      area,
      organizationType,
      headOfOrganization,
      position,
      headNumber,
      headEmail,
      totalResidents,
      ageRange,
      numberOfStaff,
      mission,
      vision,
      description,
      socialMediaLinks,
      latitude,
      longitude,
    };

    const filesToUpdate = ['registrationCertificate', 'license', 'proofOfAddress', 'userImageUrl'];
    const uploadPromises = filesToUpdate.map(async (key) => {
      if (req.files && req.files[key]) {
        return {
          key,
          value: (await cloudinary.v2.uploader.upload(req.files[key].path, {
            folder: "Organizations",
            crop: "scale",
          })).secure_url
        };
      }
      return null;
    });

    // Resolve all upload promises
    const uploadedFiles = await Promise.all(uploadPromises);
    uploadedFiles.forEach(file => {
      if (file) {
        updateData[file.key] = file.value;
      }
    });

    // Update the organization with new data
    await User.findByIdAndUpdate(organizationId, updateData);

    res.status(200).json({
      success: true,
      message: "Organization updated successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ?? "Server Error",
    });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const deletedBloodBank = await User.findByIdAndDelete(req.params.id);
    if (!deletedBloodBank) {
      return res.json({
        success: false,
        message: "BloodBank Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "BloodBank Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const bloodBankPagination = async (req, res) => {
  const requestedPage = Number(req.query.page);

  const resultPerPage = 6;

  try {
    const bloodbanks = await BloodBanks.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    if (bloodbanks.length === 0) {
      return res.json({
        success: false,
        message: "No Blood Banks Right Now",
      });
    }

    res.json({
      success: true,
      bloodbanks: bloodbanks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllOrganizations,
  registerOrganization,
  updateOrganization,
  deleteOrganization,
  bloodBankPagination,
  getOrgById,
};
