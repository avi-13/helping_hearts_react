const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const RequestBlood = require("../../model/RequestBloodModel");
const { sendEmailController } = require("../sendEmailController");

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "avicekbhatta.13@gmail.com",
      pass: "qarn zklx fngd jvgx",
    },
  });

  let info = await transporter.sendMail({
    from: "merojagir0@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};

const sendVerification = async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const { email } = req.body;

  const isAUser = await User.findOne({ email: email });
  if (isAUser) {
    return res.json({
      success: false,
      message: "User already exists.",
    });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address. Please provide a valid email.",
    });
  }
  try {
    const emailSent = await sendEmailController(
      email,
      "Welcome to Helping Hearts",
      `Your verification code is: ${otp}`
    );
    console.log(otp);

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: "Otp has been Sent to your email.",
        otp: otp,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          "Failed to send email. Please check the recipient's email address.",
      });
    }
  } catch (error) {
    console.error("Error handling /send-verification route:", error);

    let errorMessage = "Server error.";
    if (error.message.includes("No recipients defined")) {
      errorMessage =
        "Invalid email address. Please check the recipient's email address.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, number, password, otp } = req.body;
    const { userVerificationCode } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }
    const userName =
      fullName.trim().toLowerCase().replace(/\s+/g, " ").split(" ").join("") +
      "-hh-" +
      Math.floor(1000 + Math.random() * 9000);

    const generateSalt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, generateSalt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      username: userName,
      number: number,
      password: passwordEncrypted,
    });

    if (userVerificationCode == otp) {
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "Your account has been created",
      });
    } else {
      return res.json({
        success: false,
        message: "Verification code did not match",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Server Error!! \n Please Try Again");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please Enter all the fields",
    });
  }

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.json({
        success: false,
        message: "User Doesnot Exists",
      });
    }

    const passwordToCompare = findUser.password;

    const isMatched = await bcrypt.compare(password, passwordToCompare);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
        isOrganization: findUser.isOrganization,
      },
      process.env.JWT_TOKEN_SECRET
    );

    return res.status(200).json({
      success: true,
      token: token,
      userData: findUser,
      message: "Logged In successfully",
    });
  } catch (error) {
    res.status(500).json("Server Error \n Please try again");
  }
};

//  fetching all the users
const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({
      $and: [{ isAdmin: false }, { isOrganization: false }],
    }).sort({ createdAt: -1 });

    const orphanageList = await User.find({
      $and: [{ organizationType: "orphanage" }, { isOrganization: true }],
    }).sort({ createdAt: -1 });

    const oldAgeHomeList = await User.find({
      $and: [{ organizationType: "oldagehome" }, { isOrganization: true }],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      users: userList,
      orphanageList: orphanageList,
      oldAgeHomeList: oldAgeHomeList,
      message: "success",
    });
  } catch (error) {
    res.json(error);
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "",
    });
  }
  try {
    const singleUser = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "",
      user: singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.files)
    console.log(req.body)
    const id = req.params.id;
    const { userImageUrl } = req.files;
    if (userImageUrl) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        userImageUrl.path,
        {
          folder: "Users",
          crop: "scale",
        }
      );
      const {
        fullName,
        email,
        number,
        // currentAddress,
        // municipality,
        // wardNo,
        // gender,
        // dob,
        // isAvailable,
        // bloodGroup,
        // noPreviousDonation,
        // emergencyNumber,
      } = req.body;
      if (
        !fullName ||
        !email ||
        !number
        // !currentAddress ||
        // !municipality ||
        // !wardNo ||
        // !gender ||
        // !dob ||
        // !bloodGroup ||
        // !noPreviousDonation ||
        // !emergencyNumber
      ) {
        return res.json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedDonor = {
        fullName: fullName,
        email: email,
        number: number,
        // currentAddress: currentAddress,
        // municipality: municipality,
        // wardNo: wardNo,
        // gender: gender,
        // dob: dob,
        // bloodGroup: bloodGroup,
        // noPreviousDonation: noPreviousDonation,
        // emergencyNumber: emergencyNumber,
        // isAvailable: isAvailable,
        userImageUrl: uploadedImage.secure_url,
      };
      await User.findByIdAndUpdate(id, updatedDonor);

      return res.status(200).json({
        success: true,
        message: "You Account has been successfully Updated ",
        updateUser: updatedDonor,
      });
    } else {
      const {
        fullName,
        email,
        number,
        // currentAddress,
        // municipality,
        // wardNo,
        // gender,
        // dob,
        // isAvailable,
        // bloodGroup,
        // noPreviousDonation,
        // emergencyNumber,
      } = req.body;
      if (
        !fullName ||
        !email ||
        !number
        // !currentAddress ||
        // !municipality ||
        // !wardNo ||
        // !gender ||
        // !dob ||
        // !bloodGroup ||
        // !noPreviousDonation ||
        // !emergencyNumber
      ) {
        return res.json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedDonor = {
        fullName: fullName,
        email: email,
        number: number,
        // currentAddress: currentAddress,
        // municipality: municipality,
        // wardNo: wardNo,
        // gender: gender,
        // dob: dob,
        // bloodGroup: bloodGroup,
        // noPreviousDonation: noPreviousDonation,
        // emergencyNumber: emergencyNumber,
        // isAvailable: isAvailable,
      };
      await User.findByIdAndUpdate(id, updatedDonor);

      return res.status(200).json({
        success: true,
        message: "You Account has been successfully Updated without image",
        updateUser: updatedDonor,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Doesnot exists",
    });
  }
};

const updateUserWithoutImage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    // console.log(user.isADonor);
    console.log(req.body);

    if (user.isADonor == false) {
      const { fullName, email, number, currentAddress, municipality, wardNo } =
        req.body;

      if (
        !fullName ||
        !email ||
        !number ||
        !currentAddress ||
        !municipality ||
        !wardNo
      ) {
        return res.status(404).json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedUser = {
        fullName: fullName,
        email: email,
        number: number,
        currentAddress: currentAddress,
        municipality: municipality,
        wardNo: wardNo,
      };
      await User.findByIdAndUpdate(id, updatedUser);

      return res.status(200).json({
        success: true,
        message: "You have been register as a donor",
        userData: updatedUser,
      });
    } else {
      const {
        fullName,
        email,
        number,
        currentAddress,
        municipality,
        wardNo,
        gender,
        dob,
        isAvailable,
        bloodGroup,
        noPreviousDonation,
        emergencyNumber,
      } = req.body;
      if (
        !fullName ||
        !email ||
        !number ||
        !currentAddress ||
        !municipality ||
        !wardNo ||
        !fullName ||
        !gender ||
        !dob ||
        !bloodGroup ||
        !noPreviousDonation ||
        !emergencyNumber
      ) {
        return res.status(404).json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedDonor = {
        fullName: fullName,
        email: email,
        number: number,
        currentAddress: currentAddress,
        municipality: municipality,
        wardNo: wardNo,
        gender: gender,
        dob: dob,
        bloodGroup: bloodGroup,
        noPreviousDonation: noPreviousDonation,
        emergencyNumber: emergencyNumber,
        isAvailable: isAvailable,
      };
      await User.findByIdAndUpdate(id, updatedDonor);

      return res.status(201).json({
        success: true,
        message: "You Account has been successfully Updated",
        updateUser: updatedDonor,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const generatedPassword = Math.random().toString(36).slice(-6);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(generatedPassword, salt);
    await user.save();

    const emailSubject = "Password Reset";
    const emailText = `Your new password is: ${generatedPassword}`;

    await sendEmail(email, emailSubject, emailText);

    res.json({
      success: true,
      message: "New password sent to your email for password reset",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { district, bloodGroup } = req.query;
    let query = {};
    if (district) {
      query.currentAddress = { $regex: district, $options: "i" };
    }
    if (bloodGroup) {
      query.bloodGroup = new RegExp(
        "^" + bloodGroup.replace("+", "\\+").replace("-", "\\-") + "?"
      );
    }
    const users = await User.find({
      $and: [query, { isADonor: true }],
    });
    console.log(users);

    res.json({
      success: true,
      users: users,
      message: "success",
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRequestsByUserId = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const userRequests = await RequestBlood.find({ userId: id }).sort({
      createdAt: -1,
    });

    console.log(userRequests);

    if (!userRequests || userRequests.length === 0) {
      return res.json({
        success: false,
        message: "No requests found for this user",
      });
    }

    res.status(200).json({
      success: true,
      userRequests: userRequests,
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

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserWithoutImage,
  forgetPassword,
  searchUsers,
  getRequestsByUserId,
  sendVerification,
};
