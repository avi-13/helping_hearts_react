import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerOrganizationApi } from "../apis/api";

const OrphanageRegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [orphanageName, setOrphanageName] = useState("");
  const [orphanageEmail, setOrphanageEmail] = useState("");
  const [orphanageContactNumber, setOrphanageContactNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [latitude, setLatitude] = useState("");
  const [headEmail, setHeadEmail] = useState("");
  const [longitude, setLongitude] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [area, setArea] = useState("");
  const [headOfOrphanageName, setHeadOfOrphanageName] = useState("");
  const [headOfOrphanagePosition, setHeadOfOrphanagePosition] = useState("");
  const [headOfOrphanageContactNumber, setHeadOfOrphanageContactNumber] =
    useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [ageRangeOfChildren, setAgeRangeOfChildren] = useState("");
  const [numberOfStaff, setNumberOfStaff] = useState("");
  const [description, setDescription] = useState("");
  const [orphanageMission, setOrphanageMission] = useState("");
  const [orphanageVision, setOrphanageVision] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [terms, setTerms] = useState(false);

  const [certificateImage, setCertificateImage] = useState(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [proofImagePreview, setProofImagePreview] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [licenseImagePreview, setLicenseImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleCertificateImageUpload = (event) => {
    const file = event.target.files[0];
    setCertificateImage(file);
    setCertificateImagePreview(URL?.createObjectURL(file));
  };

  const handleProofImageUpload = (event) => {
    const file = event.target.files[0];
    setProofImage(file);
    setProofImagePreview(URL?.createObjectURL(file));
  };

  const handleLicenseImageUpload = (event) => {
    const file = event.target.files[0];
    setLicenseImage(file);
    setLicenseImagePreview(URL?.createObjectURL(file));
  };

  const handleUserImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setProfileImagePreview(URL?.createObjectURL(file));
  };

  const registerOrphanage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("organizationName", orphanageName);
    data.append("organizationEmail", orphanageEmail);
    data.append("orphanageContactNumber", orphanageContactNumber);
    data.append("registrationNumber", registrationNumber);
    data.append("state", province);
    data.append("district", district);
    data.append("municipality", municipality);
    data.append("ward", ward);
    data.append("wardNo", wardNo);
    data.append("area", area);
    data.append("latitude", latitude);
    data.append("socialMediaLinks", socialMediaLinks);
    data.append("longitude", longitude);
    data.append("headOfOrganization", headOfOrphanageName);
    data.append("position", headOfOrphanagePosition);
    data.append("headNumber", headOfOrphanageContactNumber);
    data.append("headEmail", headEmail);
    data.append("totalResidents", numberOfChildren);
    data.append("ageRange", ageRangeOfChildren);
    data.append("numberOfStaff", numberOfStaff);
    data.append("description", description);
    data.append("mission", orphanageMission);
    data.append("organizationType", organizationType);
    data.append("vission", orphanageVision);
    data.append("registrationCertificate", certificateImage);
    data.append("proofOfAddress", proofImage);
    data.append("license", licenseImage);
    data.append("userImageUrl", profileImage);
    setIsLoading(true);
    registerOrganizationApi(data).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error(res.data.message);
      }
      setIsLoading(false);
    });
  };
  return (
    <div className="container mx-auto my-24 p-6">
      <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white mb-6">
        Orphanage Registration Form
      </h3>
      <div className="w-full p-6 border rounded shadow-lg">
        <form>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mb-4">
                Orphanage Information
              </h4>
            </div>
            <div>
              <label className="block mb-2">Orphanage Name</label>
              <input
                type="text"
                onChange={(e) => setOrphanageName(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Orphanage Email</label>
              <input
                onChange={(e) => setOrphanageEmail(e.target.value)}
                type="email"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Orphanage Contact Number</label>
              <input
                onChange={(e) => setOrphanageContactNumber(e.target.value)}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            {/* <div>
              <label className="block mb-2">Username</label>
              <input
              onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div> */}
            <div>
              <label className="block mb-2">Registration Number</label>
              <input
                onChange={(e) => setRegistrationNumber(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Organization Type</label>
              <select
                className="w-full rounded-md !border !border-gray-500 focus:border-none focus:!ring-gray-500"
                type="text"
                onChange={(e) => setOrganizationType(e.target.value)}
              >
                <option>Select Organization Type</option>
                <option value="orphanage">Orphanage</option>
                <option value="oldagehome">Old Age Home</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Social Media Links</label>
              <input
                onChange={(e) => setSocialMediaLinks(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mt-6 mb-4">
                Orphanage Address Information
              </h4>
            </div>
            <div>
              <label className="block mb-2">State/Province</label>
              <input
                onChange={(e) => setProvince(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">District</label>
              <input
                onChange={(e) => setDistrict(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Municipality</label>
              <input
                onChange={(e) => setMunicipality(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Ward</label>
              <input
                onChange={(e) => setWard(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Ward No.</label>
              <input
                onChange={(e) => setWardNo(e.target.value)}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Area</label>
              <input
                onChange={(e) => setArea(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Latitude</label>
              <input
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
                  const formattedValue =
                    floatValue !== null ? floatValue.toFixed(2) : "";
                  setLatitude(formattedValue);
                }}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Longitude</label>
              <input
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
                  const formattedValue =
                    floatValue !== null ? floatValue.toFixed(2) : "";
                  setLongitude(formattedValue);
                }}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mt-6 mb-4">
                Head Of Orphanage
              </h4>
            </div>
            <div>
              <label className="block mb-2">Name</label>
              <input
                onChange={(e) => setHeadOfOrphanageName(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Position</label>
              <input
                onChange={(e) => setHeadOfOrphanagePosition(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                onChange={(e) =>
                  setHeadOfOrphanageContactNumber(e.target.value)
                }
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2">Head Email</label>
              <input
                onChange={(e) => setHeadEmail(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mt-6 mb-4">
                Orphanage Details
              </h4>
            </div>
            <div>
              <label className="block mb-2">Number of Children</label>
              <input
                onChange={(e) => setNumberOfChildren(e.target.value)}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Age Range of Children</label>
              <input
                onChange={(e) => setAgeRangeOfChildren(e.target.value)}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Number of Staff</label>
              <input
                onChange={(e) => setNumberOfStaff(e.target.value)}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div className="col-span-3">
              <label className="block mb-2">Description of Orphanage</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              ></textarea>
            </div>
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mt-6 mb-4">
                Orphanage Mission and Vision
              </h4>
            </div>
            <div className="col-span-3">
              <label className="block mb-2">Orphanage Mission</label>
              <textarea
                onChange={(e) => setOrphanageMission(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              ></textarea>
            </div>
            <div className="col-span-3">
              <label className="block mb-2">Orphanage Vision</label>
              <textarea
                onChange={(e) => setOrphanageVision(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              ></textarea>
            </div>
            <div className="col-span-3">
              <h4 className="text-xl font-semibold mt-6 mb-4">
                Documents Upload
              </h4>
            </div>
            <div>
              <label className="block mb-2">Registration Certificate</label>
              <input
                onChange={handleCertificateImageUpload}
                type="file"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
              {certificateImagePreview && (
                <div className="mt-4">
                  <img
                    src={certificateImagePreview}
                    className="w-full rounded-md"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">License</label>
              <input
                onChange={handleLicenseImageUpload}
                type="file"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
              {licenseImagePreview && (
                <div className="mt-4">
                  <img
                    src={licenseImagePreview}
                    className="w-full rounded-md"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Proof of Address</label>
              <input
                onChange={handleProofImageUpload}
                type="file"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
              {proofImagePreview && (
                <div className="mt-4">
                  <img src={proofImagePreview} className="w-full rounded-md" />
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Upload Your Logo</label>
              <input
                onChange={handleUserImageUpload}
                type="file"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
              {profileImagePreview && (
                <div className="mt-4">
                  <img
                    src={profileImagePreview}
                    className="w-full rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="col-span-3 mt-4">
              <input
                onChange={(e) => setTerms(e.target.checked)}
                className="cursor-pointer"
                type="checkbox"
                id="terms"
              />
              <label htmlFor="terms" className="ml-2 cursor-pointer">
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="col-span-3 mt-4">
              <button
              onInput={(e) => {
                const value = e.target.value;
                if (value < 0) {
                  e.target.value = 0;
                }
                setOrphanageContactNumber(e.target.value);
              }}
                onClick={registerOrphanage}
                className="w-full bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#6aa023] transition duration-300"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Register Your Orphanage"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrphanageRegistrationForm;

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import * as Yup from "yup";

// const OrphanageRegistrationForm = () => {
//   const validationSchema = Yup.object({
//     orphanageName: Yup.string().required("Orphanage name is required"),
//     orphanageEmail: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     orphanageContactNumber: Yup.string().required("Contact number is required"),
//     registrationNumber: Yup.string().required(
//       "Registration number is required"
//     ),
//     state: Yup.string().required("State is required"),
//     district: Yup.string().required("District is required"),
//     municipality: Yup.string().required("Municipality is required"),
//     ward: Yup.string().required("Ward is required"),
//     wardNo: Yup.string().required("Ward number is required"),
//     area: Yup.string().required("Area is required"),
//     headOfOrphanageName: Yup.string().required("Name is required"),
//     headOfOrphanagePosition: Yup.string().required("Position is required"),
//     headOfOrphanageContactNumber: Yup.string().required(
//       "Contact number is required"
//     ),
//     numberOfChildren: Yup.number()
//       .min(1, "At least one child is required")
//       .required("Number of children is required"),
//     ageRangeOfChildren: Yup.string().required(
//       "Age range of children is required"
//     ),
//     numberOfStaff: Yup.number()
//       .min(1, "At least one staff member is required")
//       .required("Number of staff is required"),
//     serviceProvided: Yup.string().required("Service provided is required"),
//     orphanageMission: Yup.string().required("Mission is required"),
//     orphanageVision: Yup.string().required("Vision is required"),
//     terms: Yup.boolean()
//       .required("You must accept the terms and conditions")
//       .oneOf([true], "You must accept the terms and conditions"),
//   });

//   const initialValues = {
//     orphanageName: "",
//     orphanageEmail: "",
//     orphanageContactNumber: "",
//     username: "",
//     registrationNumber: "",
//     state: "",
//     district: "",
//     municipality: "",
//     ward: "",
//     wardNo: "",
//     area: "",
//     headOfOrphanageName: "",
//     headOfOrphanagePosition: "",
//     headOfOrphanageContactNumber: "",
//     numberOfChildren: "",
//     ageRangeOfChildren: "",
//     numberOfStaff: "",
//     serviceProvided: "",
//     orphanageMission: "",
//     orphanageVision: "",
//     terms: false,
//   };

//   return (
//     <div className="container mx-auto my-24 p-6">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           console.log("Submitting.........");
//           console.log(values);
//           setSubmitting(false);
//           alert(JSON.stringify(values, null, 2));
//         }}
//       >
//         {(formik) => (
//           <Form className="w-full p-6 border rounded shadow-lg">
//             <div className="grid grid-cols-3 gap-6">
//               {/* Orphanage Information */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mb-4">
//                   Orphanage Information
//                 </h4>
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="orphanageName" className="block mb-2">
//                   Orphanage Name
//                 </label>
//                 <Field
//                   id="orphanageName"
//                   name="orphanageName"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="orphanageName"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="orphanageEmail" className="block mb-2">
//                   Orphanage Email
//                 </label>
//                 <Field
//                   id="orphanageEmail"
//                   name="orphanageEmail"
//                   type="email"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="orphanageEmail"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="orphanageContactNumber" className="block mb-2">
//                   Orphanage Contact Number
//                 </label>
//                 <Field
//                   id="orphanageContactNumber"
//                   name="orphanageContactNumber"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="orphanageContactNumber"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="orphanageName" className="block mb-2">
//                   Orphanage Register Number
//                 </label>
//                 <Field
//                   id="registrationNumber"
//                   name="registrationNumber"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="registrationNumber"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               {/* Orphanage Address Information */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mt-6 mb-4">
//                   Orphanage Address Information
//                 </h4>
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="state" className="block mb-2">
//                   State/Province
//                 </label>
//                 <Field
//                   id="state"
//                   name="state"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="state"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="district" className="block mb-2">
//                   District
//                 </label>
//                 <Field
//                   id="district"
//                   name="district"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="district"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="municipality" className="block mb-2">
//                   Municipality
//                 </label>
//                 <Field
//                   id="municipality"
//                   name="municipality"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="municipality"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="ward" className="block mb-2">
//                   Ward
//                 </label>
//                 <Field
//                   id="ward"
//                   name="ward"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="ward"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="wardNo" className="block mb-2">
//                   Ward No.
//                 </label>
//                 <Field
//                   id="wardNo"
//                   name="wardNo"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="wardNo"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="area" className="block mb-2">
//                   Area
//                 </label>
//                 <Field
//                   id="area"
//                   name="area"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="area"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               {/* Head Of Orphanage */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mt-6 mb-4">
//                   Head Of Orphanage
//                 </h4>
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="headOfOrphanageName" className="block mb-2">
//                   Name
//                 </label>
//                 <Field
//                   id="headOfOrphanageName"
//                   name="headOfOrphanageName"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="headOfOrphanageName"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="headOfOrphanagePosition" className="block mb-2">
//                   Position
//                 </label>
//                 <Field
//                   id="headOfOrphanagePosition"
//                   name="headOfOrphanagePosition"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="headOfOrphanagePosition"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label
//                   htmlFor="headOfOrphanageContactNumber"
//                   className="block mb-2"
//                 >
//                   Contact Number
//                 </label>
//                 <Field
//                   id="headOfOrphanageContactNumber"
//                   name="headOfOrphanageContactNumber"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="headOfOrphanageContactNumber"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               {/* Orphanage Details */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mt-6 mb-4">
//                   Orphanage Details
//                 </h4>
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="numberOfChildren" className="block mb-2">
//                   Number of Children
//                 </label>
//                 <Field
//                   id="numberOfChildren"
//                   name="numberOfChildren"
//                   type="number" min={0}
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="numberOfChildren"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="ageRangeOfChildren" className="block mb-2">
//                   Age Range of Children
//                 </label>
//                 <Field
//                   id="ageRangeOfChildren"
//                   name="ageRangeOfChildren"
//                   type="text"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="ageRangeOfChildren"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <label htmlFor="numberOfStaff" className="block mb-2">
//                   Number of Staff
//                 </label>
//                 <Field
//                   id="numberOfStaff"
//                   name="numberOfStaff"
//                   type="number" min={0}
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="numberOfStaff"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-3">
//                 <label htmlFor="serviceProvided" className="block mb-2">
//                   Service Provided
//                 </label>
//                 <Field
//                   id="serviceProvided"
//                   name="serviceProvided"
//                   as="textarea"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="serviceProvided"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               {/* Orphanage Mission and Vision */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mt-6 mb-4">
//                   Orphanage Mission and Vision
//                 </h4>
//               </div>
//               <div className="col-span-3">
//                 <label htmlFor="orphanageMission" className="block mb-2">
//                   Orphanage Mission
//                 </label>
//                 <Field
//                   id="orphanageMission"
//                   name="orphanageMission"
//                   as="textarea"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="orphanageMission"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-3">
//                 <label htmlFor="orphanageVision" className="block mb-2">
//                   Orphanage Vision
//                 </label>
//                 <Field
//                   id="orphanageVision"
//                   name="orphanageVision"
//                   as="textarea"
//                   className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
//                 />
//                 <ErrorMessage
//                   name="orphanageVision"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               {/* Documents Upload */}
//               <div className="col-span-3">
//                 <h4 className="text-xl font-semibold mt-6 mb-4">
//                   Documents Upload
//                 </h4>
//               </div>
//               <div>
//                 <label className="block mb-2">Registration Certificate</label>
//                 <input type="file" className="w-full p-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block mb-2">License</label>
//                 <input type="file" className="w-full p-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block mb-2">Proof of Address</label>
//                 <input type="file" className="w-full p-2 border rounded" />
//               </div>
//               <div className="col-span-3 mt-4">
//                 <Field
//                   type="checkbox"
//                   className="cursor-pointer"
//                   name="terms"
//                   id="terms"
//                 />
//                 <label htmlFor="terms" className="ml-2 cursor-pointer">
//                   I agree to the terms and conditions.
//                 </label>
//                 <ErrorMessage
//                   name="terms"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="col-span-3 mt-4">
//                 <button
//                   disabled={formik.isSubmitting || !formik.isValid}
//                   type="submit"
//                   className="w-full bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#6aa023] transition duration-300 cursor-pointer"
//                 >
//                   Register Your Orphanage
//                 </button>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default OrphanageRegistrationForm;
