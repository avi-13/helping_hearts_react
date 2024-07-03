import { Select } from "flowbite-react";
import React from "react";

const DonationForm = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-w-[100vw] flex justify-center items-center mt-24 min-h-screen bg-gray-100">
      <form className="bg-white my-10 p-6 mx-12 rounded-lg shadow-lg min-w-[70vw] w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Donation Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Full Name" type="text" />
          <InputField
            label="Username"
            value={users?.username}
            disabled={true}
            type="text"
          />
          <InputField label="Email Address" type="email" />
          <InputField label="Phone Number" type="number" />
        </div>

        <SectionTitle title="Address" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <InputField label="State/Province" type="text" />
          <InputField label="District" type="text" />
          <InputField label="Municipality" type="text" />
          <InputField label="Ward" type="text" />
          <InputField label="Ward No." type="number" />
          <InputField label="Area" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <InputField label="Latitude" type="number" />
          <InputField label="Longitude" type="number" />
        </div>

        <SectionTitle title="Donation Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <InputField label="Orphanage/Old Age Home Name" type="text" />
          <InputField label="Items to Donate" type="text" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField label="Category of Supplies" type="text" />
          <InputField label="Quantity" type="number" />
        </div>

        <TextAreaField label="Description of Items" rows="5" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InputField label="Preferred Date" type="date" />
          <InputField label="Preferred Time" type="time" />
          <div>
            <label>Donation Method (Drop Off / Pick Up)" </label>
            <Select
              className="rounded-md !border !border-gray-500 shadow-sm focus:!outline-none focus:!border-gray-500 focus:!ring-gray-500"
              type="text"
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
          <InputField label="Image 1" type="file" />
          <InputField label="Image 2 (Optional)" type="file" />
        </div>

        <TextAreaField label="Additional Information" rows="5" />

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-sm text-gray-700">
              I agree to the terms and conditions.
            </span>
          </label>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-20 py-2 bg-[#8BC53E] text-white rounded-md"
          >
            Confirm Donation
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, type, placeholder, value, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      disabled={disabled ? disabled : false}
      placeholder={placeholder}
      value={value}
      className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
    />
  </div>
);

const TextAreaField = ({ label, rows }) => (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500"
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
