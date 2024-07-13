import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchSingleOrganizationApi,
  updateOrganizationApi,
} from "../../../apis/api";

const EditOrganization = ({ id }) => {
  const fetchSingleOrganization = () => {
    fetchSingleOrganizationApi(id).then((res) => {
      const { organization } = res.data;
      setOrphanageName(organization.organizationName);
      setOrphanageEmail(organization.email);
      setOrphanageContactNumber(organization.number);
      setRegistrationNumber(organization.registrationNumber);
      setProvince(organization.state);
      setDistrict(organization.district);
      setMunicipality(organization.municipality);
      setWard(organization.ward);
      setWardNo(organization.wardNo);
      setArea(organization.area);
      setLatitude(organization.latitude);
      setSocialMediaLinks(organization.socialMediaLinks);
      setLongitude(organization.longitude);
      setHeadOfOrphanageName(organization.headOfOrganization);
      setHeadOfOrphanagePosition(organization.position);
      setHeadOfOrphanageContactNumber(organization.headNumber);
      setHeadEmail(organization.headEmail);
      setNumberOfChildren(organization.totalResidents);
      setAgeRangeOfChildren(organization.ageRange);
      setNumberOfStaff(organization.numberOfStaff);
      setDescription(organization.description);
      setOrphanageMission(organization.mission);
      setOrganizationType(organization.organizationType);
      setOrphanageVision(organization.vission);
      setCertificateImage(organization.registrationCertificate);
      setProofImage(organization.proofOfAddress);
      setLicenseImage(organization.license);
      setProfileImage(organization.userImageUrl);
    });
  };

  useEffect(() => {
    fetchSingleOrganization();
  }, []);

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
    updateOrganizationApi(id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res.data.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white mb-6">
        Edit Your Organization
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
                value={orphanageName}
                onChange={(e) => setOrphanageName(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Orphanage Email</label>
              <input
                onChange={(e) => setOrphanageEmail(e.target.value)}
                type="email"
                value={orphanageEmail}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Orphanage Contact Number</label>
              <input
                onChange={(e) => setOrphanageContactNumber(e.target.value)}
                type="number"
                value={orphanageContactNumber}
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
                value={registrationNumber}
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
                value={organizationType}
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
                value={socialMediaLinks}
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
                value={province}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">District</label>
              <input
                onChange={(e) => setDistrict(e.target.value)}
                type="text"
                value={district}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Municipality</label>
              <input
                onChange={(e) => setMunicipality(e.target.value)}
                type="text"
                value={municipality}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Ward</label>
              <input
                onChange={(e) => setWard(e.target.value)}
                type="text"
                value={ward}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Ward No.</label>
              <input
                onChange={(e) => setWardNo(e.target.value)}
                type="number"
                value={wardNo}
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Area</label>
              <input
                onChange={(e) => setArea(e.target.value)}
                type="text"
                value={area}
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
                value={latitude}
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
                value={longitude}
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
                value={headOfOrphanageName}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Position</label>
              <input
                onChange={(e) => setHeadOfOrphanagePosition(e.target.value)}
                type="text"
                value={headOfOrphanagePosition}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                onChange={(e) =>
                  setHeadOfOrphanageContactNumber(e.target.value)
                }
                value={headOfOrphanageContactNumber}
                type="number"
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2">Head Email</label>
              <input
                value={headEmail}
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
                value={numberOfChildren}
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
                value={ageRangeOfChildren}
                type="text"
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2">Number of Staff</label>
              <input
                onChange={(e) => setNumberOfStaff(e.target.value)}
                type="number"
                value={numberOfStaff}
                min={0}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              />
            </div>
            <div className="col-span-3">
              <label className="block mb-2">Description of Orphanage</label>
              <textarea
                value={description}
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
                value={orphanageMission}
                onChange={(e) => setOrphanageMission(e.target.value)}
                className="w-full p-2 border rounded focus:border-none focus:ring-gray-600"
              ></textarea>
            </div>
            <div className="col-span-3">
              <label className="block mb-2">Orphanage Vision</label>
              <textarea
                value={orphanageVision}
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
              <div className="mt-4">
                <img src={proofImage} className="w-full rounded-md" />
              </div>
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

export default EditOrganization;
