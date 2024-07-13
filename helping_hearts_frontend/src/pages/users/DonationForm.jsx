import { CircularProgress } from "@mui/material";
import { Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDonationApi, fetchSingleOrganizationApi } from "../../apis/api";

const DonationForm = ({ isOpen, onClose, userId }) => {
  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [itemsToDonate, setItemsToDonate] = useState("");
  const [categoryOfSupplies, setCategoryOfSupplies] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [donationMethod, setDonationMethod] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [organization, setOrganization] = useState({});
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageOnePreview, setImageOnePreview] = useState(null);
  const [imageTwoPreview, setImageTwoPreview] = useState(null);

  const fetchOrganizationName = () => {
    fetchSingleOrganizationApi(userId).then((res) => {
      setOrganization(res.data?.organization);
      console.log(res.data?.organization?.organizationName);
    });
  };

  useEffect(() => {
    fetchOrganizationName();
    return () => {
      if (imageOnePreview) URL?.revokeObjectURL(imageOnePreview);
      if (imageTwoPreview) URL?.revokeObjectURL(imageTwoPreview);
    };
  }, [imageOnePreview, imageTwoPreview]);

  const handleImageOneChange = (event) => {
    const file = event.target.files[0];
    setImageOne(file);
    setImageOnePreview(URL?.createObjectURL(file));
  };

  const handleImageTwoChange = (event) => {
    const file = event.target.files[0];
    setImageTwo(file);
    setImageTwoPreview(URL?.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const donationData = new FormData();
    donationData.append("fullName", fullName);
    donationData.append("username", users?.username);
    donationData.append("email", email);
    donationData.append("number", number);
    donationData.append("state", state);
    donationData.append("district", district);
    donationData.append("municipality", municipality);
    donationData.append("ward", ward);
    donationData.append("wardNo", wardNo);
    donationData.append("area", area);
    donationData.append("latitude", latitude);
    donationData.append("longitude", longitude);
    donationData.append("organizationName", organization?.organizationName);
    donationData.append("itemsToDonate", itemsToDonate);
    donationData.append("categoryOfSupplies", categoryOfSupplies);
    donationData.append("quantity", quantity);
    donationData.append("description", description);
    donationData.append("preferredDate", preferredDate);
    donationData.append("preferredTime", preferredTime);
    donationData.append("donationMethod", donationMethod);
    donationData.append("donatedBy", users?._id);
    donationData.append("donatedTo", userId);
    donationData.append("additionalInformation", additionalInformation);
    donationData.append("imageOne", imageOne);
    donationData.append("imageTwo", imageTwo);

    setIsLoading(true);
    console.log(donationData);
    // Call the API here
    createDonationApi(donationData).then((res) => {
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error(res.data.message);
      }
      setIsLoading(false);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll">
      <form className="bg-white my-10 p-6 mt-[58rem] rounded-lg shadow-lg min-w-[70vw] w-full max-w-2xl ">
        <h2 className="text-2xl font-bold mb-4 text-center">Donation Form</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 text-xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Full Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={users?.fullName}
          />
          <InputField
            label="Username"
            value={users?.username}
            disabled={true}
            type="text"
          />
          <InputField
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <InputField
            label="Phone Number"
            onChange={(e) => setNumber(e.target.value)}
            type="number"
          />
        </div>

        <SectionTitle title="Address" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <InputField
            label="State/Province"
            onChange={(e) => setState(e.target.value)}
            type="text"
          />
          <InputField
            label="District"
            type="text"
            onChange={(e) => setDistrict(e.target.value)}
          />
          <InputField
            label="Municipality"
            onChange={(e) => setMunicipality(e.target.value)}
            type="text"
          />
          <InputField
            label="Ward"
            type="text"
            onChange={(e) => setWard(e.target.value)}
          />
          <InputField
            label="Ward No."
            type="number"
            onChange={(e) => setWardNo(e.target.value)}
          />
          <InputField
            label="Area"
            type="text"
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <InputField
            label="Latitude"
            onChange={(e) => setLatitude(e.target.value)}
            type="number"
          />
          <InputField
            label="Longitude"
            onChange={(e) => setLongitude(e.target.value)}
            type="number"
          />
        </div>

        <SectionTitle title="Donation Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <InputField
            label="Organization Name"
            onChange={(e) => setOrganizationName(e.target.value)}
            type="text"
            value={organization?.organizationName}
            disabled={true}
          />
          <InputField
            label="Items to Donate"
            type="text"
            onChange={(e) => setItemsToDonate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Category of Supplies"
            onChange={(e) => setCategoryOfSupplies(e.target.value)}
            type="text"
          />
          <InputField
            label="Quantity"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <TextAreaField
          label="Description of Items"
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InputField
            label="Preferred Date"
            onChange={(e) => setPreferredDate(e.target.value)}
            type="date"
          />
          <InputField
            label="Preferred Time"
            onChange={(e) => setPreferredTime(e.target.value)}
            type="time"
          />
          <div>
            <label>Donation Method (Drop Off / Pick Up)" </label>
            <Select
              className="rounded-md !border !border-gray-500 shadow-sm focus:!outline-none focus:!border-gray-500 focus:!ring-gray-500"
              type="text"
              onChange={(e) => setDonationMethod(e.target.value)}
            >
              <option>Donation Method (Drop Off / Pick Up)</option>
              <option value="drop off">
                Drop Off (You will drop yourself)
              </option>
              <option value="pick up">
                Pick Up (Our Staff will be there.)
              </option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Image 1"
            onChange={handleImageOneChange}
            type="file"
          />
          <InputField
            label="Image 2 (Optional)"
            onChange={handleImageTwoChange}
            type="file"
          />
          {imageOnePreview && (
            <div className="mt-4">
              <img src={imageOnePreview} className="w-52 h-52 rounded-md" />
            </div>
          )}
          {imageTwoPreview && (
            <div className="mt-4">
              <img src={imageTwoPreview} className="w-52 h-52 rounded-md" />
            </div>
          )}
        </div>

        <TextAreaField
          label="Additional Information"
          onChange={(e) => setAdditionalInformation(e.target.value)}
          rows="5"
        />

        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#6aa023] transition duration-300"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Confirm Donation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  placeholder,
  value,
  disabled,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      onChange={onChange}
      disabled={disabled ? disabled : false}
      placeholder={placeholder}
      value={value}
      className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
    />
  </div>
);

const TextAreaField = ({ label, rows, onChange }) => (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
      onChange={onChange}
      rows={rows}
    ></textarea>
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="mt-4">
    <h3 className="text-xl font-semibold">{title}</h3>
  </div>
);

export default DonationForm;
