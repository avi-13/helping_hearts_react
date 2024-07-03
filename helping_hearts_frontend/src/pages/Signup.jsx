import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserApi, sendOtpApi } from "../apis/api";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    const data = { email: email };
    sendOtpApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          setOpenModal(true);
          toast.success(res.data.message);
          setOtp(res?.data?.otp);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const [fnameerror, setFullnameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [numbererror, setNumberError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [cpassworderror, setCpasswordError] = useState("");

  const Validate = () => {
    let isValid = true;
    setFullnameError("");
    setNumberError("");
    setEmailError("");
    setPasswordError("");
    setCpasswordError("");
    if (fullName.trim() === "") {
      setFullnameError("Name is Required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (email.trim() !== "" && !email.includes("@")) {
      setEmailError("Invalid Email");
      isValid = false;
    }

    if (number.trim() === "" || number.length !== 10) {
      setNumberError("Number is Invalid (Must be 10 word) ");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setCpasswordError("Password doesnot match");
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password doesnot match");
      isValid = false;
    }
    return isValid;
  };

  const validatein = (e) => {
    e.preventDefault();
    const isValid = Validate();
    if (!isValid) {
      return;
    } else {
      sendOtp(email);
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  // function for button
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName: fullName,
      email: email,
      number: number,
      password: password,
      userVerificationCode: userVerificationCode,
      otp: otp,
    };

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          navigate("/login");
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div className="flex items-center mx-20 my-32 justify-center bg-white">
      <div className="bg-[#C7E3C2] shadow-md rounded-lg flex flex-col md:flex-row max-w-4xl w-full">
        <div className="w-full md:w-1/2">
          <img
            src="assets/images/signup.png"
            alt="Elderly hands"
            className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-4 text-2xl font-bold">
            Create Your Account From Here
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">FullName</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="FullName"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              {fnameerror && <p className="text-danger">{fnameerror}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </span>
                <input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              {emailerror && <p className="text-danger">{emailerror}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Number</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Number"
                  type="number"
                  min={0}
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              {numbererror && <p className="text-danger">{numbererror}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="Password"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              {passworderror && <p className="text-danger">{passworderror}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-1 left-0 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  type="text"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              {cpassworderror && (
                <p className="text-danger">{cpassworderror}</p>
              )}
            </div>
            <div className="flex items-baseline justify-center">
              <button
                type="submit"
                onClick={(e) => validatein(e)}
                className="w-full px-6 py-2 mt-4 text-white bg-[#8BC53E] rounded-md hover:bg-[#8BC53E]"
              >
                SIGNUP
              </button>
              <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header>
                  <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
                    Verification Code
                  </h3>
                </Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Enter your verification code below to create your account.
                    </p>
                    <div>
                      <Label htmlFor="code" value="Your Verification Code" />
                      <TextInput
                        id="code"
                        type="text"
                        onChange={(e) =>
                          setUserVerificationCode(e.target.value)
                        }
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:!ring-gray-500"
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <button
                        className="px-6 py-2 mt-4 bg-[#8BC53E] text-white font-semibold rounded-md shadow-md hover:bg-[#6aa023] transition duration-300"
                        onClick={handleSubmit}
                      >
                        Create your account
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
