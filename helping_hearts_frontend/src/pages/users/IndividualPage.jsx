import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchSingleOrganizationApi,
  getAllCampaignByBBApi,
  registerForCampaignApi,
  sendMessageApi,
} from "../../apis/api";

import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommonBtn from "../../components/CommonBtn";
import DonationForm from "./DonationForm";
function IndividualPage() {
  const users = JSON.parse(localStorage.getItem("user"));

  const [isRegisterNowOpen, setIsRegisterNowOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState([]);
  console.log(campaign);

  const openRegisterNow = () => {
    setIsRegisterNowOpen(true);
  };
  const closeRegisterNow = () => {
    setIsRegisterNowOpen(false);
  };

  const registerForCampaign = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // making logical form data
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("campaigns", id);

    // making Api call
    registerForCampaignApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeRegisterNow();
          toast.success(res.data.message);
        }
      })
      .catch((e) => {
        toast.error("Server Error");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCampaigns = async () => {
    try {
      const response = await getAllCampaignByBBApi(id);
      setCampaign(response.data.allCampaigns);
    } catch (error) {
      console.error("Error Fetching orphanages", error);
    }
  };

  const [isDonateNowOpen, setIsDonateNowOpen] = useState(false);

  const openDonateNow = () => {
    setIsDonateNowOpen(true);
  };

  const closeDonateNow = () => {
    setIsDonateNowOpen(false);
  };

  const { id } = useParams();
  const [orphanage, setOrphanage] = useState({});

  useEffect(() => {
    fetchSingleOrganizationApi(id).then((res) => {
      setOrphanage(res.data?.organization);
    });
    fetchCampaigns();
  }, [id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Add leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("message", message);
    formData.append("user", id);

    sendMessageApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setnumber("");
          setMessage("");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const [currentIndexevent, setCurrentIndexevent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexevent((prevIndex) => (prevIndex + 1) % campaign.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndexevent, campaign.length]);

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
            <div className="flex flex-row justify-center">
              <Link
                className="w-full text-center bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#5b9015] transition duration-300"
                onClick={openDonateNow}
              >
                Donate Now
              </Link>
              <DonationForm
                isOpen={isDonateNowOpen}
                onClose={closeDonateNow}
                userId={id}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="w-full lg:w-full border border-gray-400">
          <div className="border-b border-gray-400">
            <nav className="flex" style={{ backgroundColor: "#f0f0f0" }}>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-3 w-1/3 text-sm border border-gray-400 font-semibold ${
                  activeTab === "details"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E] hover:bg-gray-200"
                }`}
              >
                ORPHANAGE DETAILS
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`px-6 py-3 w-1/3 border border-gray-400 text-sm font-semibold ${
                  activeTab === "members"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E] hover:bg-gray-200"
                }`}
              >
                MEMBER DETAILS
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-6 py-3 w-1/3 border border-gray-400 text-sm font-semibold ${
                  activeTab === "contact"
                    ? "text-white bg-[#8BC53E]"
                    : "text-[#8BC53E] hover:bg-gray-200"
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
              <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                <form className="w-full">
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Name"
                      >
                        Name
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Name"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="text"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => setnumber(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      type="number"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Your message here .....
                    </label>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="message"
                      rows="4"
                      placeholder="Your message here ....."
                    ></textarea>
                  </div>
                  <div className="w-full px-2">
                    <CommonBtn onClick={sendMessage} label={"Contact Us"} />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative w-full mt-12 mx-auto justify-center items-center overflow-hidden">
        <div className="flex gap-8 mb-1">
          {campaign &&
            campaign.map((eachCamp, index) => (
              <div
                key={index}
                className="md:w-[450px] w-[95%] flex-shrink-0 md:ml-8 shadow-lg rounded-lg p-4 text-left flex flex-col justify-start items-start gap-4"
                style={{
                  transform: `translateX(calc(${0.01 * index}% - ${
                    index * 4
                  }px - ${currentIndexevent * (100 + 4)}%))`,
                  transition: "transform 1s ease-in-out",
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${eachCamp.campaignImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                }}
              >
                <div className="relative">
                  <span className="bg-[487410] text-white py-1 px-3 rounded-br-lg capitalize">
                    Free
                  </span>
                </div>
                <div className="w-full overflow-hidden px-6 py-4">
                  <div className="font-bold text-2xl mb-2">
                    {eachCamp.campaignName}
                  </div>
                  <p className="text-white text-base">
                    {" "}
                    {/* Set text color to white */}
                    {eachCamp.campaignGoal}
                  </p>
                </div>
                <div className="flex justify-between w-full px-4 py-4">
                  <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white">
                    {" "}
                    {/* Set text color to white */}
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="mr-2 text-white"
                    />
                    <span className="text-green-500">
                      {formatDate(eachCamp.campaignStartDate)}
                    </span>
                    {"  --  "}
                    <span className="text-red-500">
                      {formatDate(eachCamp.campaignEndDate)}
                    </span>
                  </span>
                  <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white capitalize">
                    {" "}
                    {/* Set text color to white */}
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    {eachCamp.campaignLocation}
                  </span>
                </div>
                <div className="flex ml-auto pr-6 pb-6">
                  {
                    <Link
                      onClick={openRegisterNow}
                      className="bg-[#8BC53E] hover:bg-[#487410] text-white py-2 px-4 rounded md:ml-auto"
                    >
                      Register
                    </Link>
                  }
                </div>
              </div>
            ))}
          {campaign.length === 0 && (
            <p className="w-full text-center">No Campaigns Available !!!</p>
          )}
        </div>
      </div>

      {/* <div className="row">
          <div className="col-12 p-0">
            <MapContainer
              className="req-map-container"
              center={[orphanage.latitude ?? 27.7, orphanage.longitude ?? 84]}
              zoom={25}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  orphanage.latitude ?? 27.7,
                  orphanage.longitude ?? 27.7,
                ]}
              >
                <Popup>
                  <div>
                    <h3>{orphanage.bbName}</h3>
                    <p>{orphanage.bbAddress}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div> */}
    </div>
  );
}

export default IndividualPage;
