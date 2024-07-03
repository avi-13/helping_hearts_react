import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleOrganizationApi } from "../../apis/api";
import CommonBtn from "../../components/CommonBtn";
function IndividualPage() {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState({});

  useEffect(() => {
    fetchSingleOrganizationApi(id).then((res) => {
      setOrphanage(res.data?.organization);
    });
  }, [id]);

  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto my-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center py-6">
        <div className="md:w-1/2">
          <img
            src={orphanage.userImageUrl}
            alt="Orphanage"
            className="w-full h-[300px] md:h-[600px] rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Individual Orphanage Page
          </h1>
          <div className="mt-4">
            <p>
              <strong>Orphanage Email:</strong> {orphanage.email}
            </p>
            <p>
              <strong>Orphanage Number:</strong> {orphanage.number}
            </p>
            
            <p>
              <strong>Head of Orphanage:</strong> {orphanage.headOfOrganization}
            </p>
            <p>
              <strong>Position:</strong> {orphanage.position}
            </p>
            <p>
              <strong>Contact No:</strong> {orphanage.headNumber}
            </p>
            <div className="my-4">
              <h3 className="text-lg font-semibold">Address:</h3>
              <p>Province: {orphanage.state}</p>
              <p>District: {orphanage.district}</p>
              <p>Municipality: {orphanage.municipality}</p>
              <p>Ward : {orphanage.ward}</p>
              <p>WardNo : {orphanage.wardNo}</p>
              <p>Area: {orphanage.area}</p>
              <p>Social Media Links : {orphanage.socialMediaLinks}</p>
            </div>
            <CommonBtn label={"Donate Now"} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <div className="w-4/5 border border-gray-400">
          <div className="border-b border-gray-400">
            <nav className="flex" style={{ backgroundColor: "#f0f0f0" }}>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-3 w-1/3 text-sm border border-gray-400 font-semibold ${
                  activeTab === "details"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E]"
                }`}
              >
                ORPHANAGE DETAILS
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`px-6 py-3 w-1/3 border border-gray-400 text-sm font-semibold ${
                  activeTab === "members"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E]"
                }`}
              >
                MEMBER DETAILS
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-6 py-3 w-1/3 border border-gray-400 text-sm font-semibold ${
                  activeTab === "contact"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E]"
                }`}
              >
                CONTACT US
              </button>
            </nav>
          </div>
          <div className="p-4">
            {activeTab === "details" && (
              <p>
                <br />
                {orphanage.mission}
                <br />
                {orphanage.vision}
                <br />
                <br />
                {orphanage.description}
                <br />
              </p>
            )}
            {activeTab === "members" && (
              <>
                <p>
                  <br />
                  Total Childrens : {orphanage.totalResidents}
                  <br />
                  Age Range of Childrens : {orphanage.ageRange}
                  <br />
                  Total Staffs : {orphanage.numberofStaff}
                  <br />
                  {orphanage.description}
                  <br />
                </p>
              </>
            )}
            {activeTab === "contact" && (
              <div className="flex flex-col items-center bg-white rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                <div className="w-full">
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Your message here .....
                    </label>
                    <textarea
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="message"
                      rows="4"
                      placeholder="Your message here ....."
                    ></textarea>
                  </div>
                  <div className="w-full px-2">
                    <CommonBtn label={"Contact Us"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-2">
          <span className="flex flex-row justify-between">
            <h2 className="text-md font-bold">Upcoming Campaigns</h2>
            <p className="underline"> View all</p>
          </span>
          <div className="flex flex-col gap-1 shadow-xl">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white w-full shadow rounded-sm" >
                <div>
                  <img
                    src={"/assets/images/campaign.png"}
                    alt={`Campaign ${i + 1}`}
                    className="h-20 object-cover rounded-sm"
                  />
                </div>
                <span>
                  <h3 className="text-sm font-semibold">Campaign {i + 1}</h3>
                  <p className="text-sm">2024-03-17—2024-03-20</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualPage;
