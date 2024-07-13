import {
  faAmbulance,
  faCalendarAlt,
  faHandHoldingHeart,
  faHouseMedical,
  faKitMedical,
  faLocationCrosshairs,
  faRecordVinyl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "flowbite-react";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllOrganizationsApi, viewCampaignApi } from "../apis/api";

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [orph, setOrph] = useState([]);
  const [hm, setHm] = useState([]);
  const [campaigns, setCampiagns] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const fetchALLCampaigns = async () => {
    viewCampaignApi()
      .then((res) => {
        if (res.data.success) {
          setCampiagns(res?.data?.latestCampaings);
        } else {
          toast.error("Error fetching campaigns");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCloseModal = () => setOpenModal(false);

  const fetchOrganizations = async () => {
    try {
      const response = await fetchAllOrganizationsApi();
      setOrph(response.data?.fewOrphanages);
      setHm(response.data?.fewHomes);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    fetchALLCampaigns();
  }, []);

  const services = [
    {
      icon: faUser,
      title: "Home Care",
      description:
        "These homes provide essential care, medical support, and a range of activities to promote physical and mental well-being.",
    },
    {
      icon: faHandHoldingHeart,
      title: "Care Services",
      description:
        "These homes provide essential care, medical support, and a range of activities to promote physical and mental well-being.",
    },
    {
      icon: faKitMedical,
      title: "Medical Escort",
      description:
        "These homes provide essential care, medical support, and a range of activities to promote physical and mental well-being.",
    },
  ];

  return (
    <div>
      <main>
        <section className="bg-gray-50 flex justify-center py-20 pb-[0] text-center mt-20">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 flex flex-col items-center text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                  Providing seniors & children the{" "}
                  <span className="text-[#8BC53E]">love and care</span>.
                </h1>
                <p className="mt-4 text-gray-600">
                  Old age homes offer a nurturing environment where seniors can
                  enjoy their golden years with dignity and respect.
                </p>
                <button
                  onClick={(e) => setOpenModal(true)}
                  className="mt-8 w-3/4 md:w-1/2 text-white transition-colors duration-500 hover:bg-[#487410] bg-[#8BC53E] px-6 py-3 rounded"
                >
                  Register Your Orphanage / Old Age Home
                </button>
              </div>
              <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header>
                  <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
                    Select Your Organization
                  </h3>
                </Modal.Header>
                <Modal.Body>
                  <div className="w-full flex flex-row gap-14 justify-center">
                    <Link
                      to={"/orphanage-form"}
                      className="px-6 py-2 mt-4 bg-[#8BC53E] text-white font-semibold rounded-md shadow-md hover:bg-[#6aa023] transition duration-300"
                    >
                      Register Your Orphanage
                    </Link>
                    <Link
                      to={"/orphanage-form"}
                      className="px-6 py-2 mt-4 bg-[#8BC53E] text-white font-semibold rounded-md shadow-md hover:bg-[#6aa023] transition duration-300"
                    >
                      Register Your Old Age Home
                    </Link>
                  </div>
                </Modal.Body>
              </Modal>
              <div className="md:w-1/3 mt-8 md:mt-0">
                <img
                  src="assets/images/hmpage.png"
                  alt="Care"
                  className="mx-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <h2 className=" pb-6 text-3xl font-bold text-center text-gray-800">
          We offer you the <span className="text-[#8BC53E]">best support</span>
        </h2>
        <section className="p-16 bg-slate-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((item, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col p-12 rounded-lg shadow-md text-center md:text-left"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-4xl items-center text-[#8BC53E] mb-4"
                  />
                  <h3 className="text-xl text-center font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-center text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl rounded mx-auto p-4 flex gap-12 flex-col md:flex-row md:justify-center items-center">
          <div className="w-full rounded-xl flex flex-row justify-around md:w-1/3 mb-4 md:mb-0">
            <img
              src="assets/images/elder.jpg"
              alt="Elder Care"
              className="rounded-xl shadow"
            />
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center text-center p-4 border rounded shadow">
              <div className="mb-1">
                <FontAwesomeIcon
                  icon={faAmbulance}
                  className="text-4xl items-center text-[#8BC53E]"
                />
              </div>
              <h2 className="text-xl font-bold">Ambulance</h2>
              <p>
                Creating a home filled with care, comfort, and companionship for
                our cherished elders.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded shadow">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  className="text-4xl items-center text-[#8BC53E]"
                />
              </div>
              <h2 className="text-xl font-bold">24/7 Support</h2>
              <p>
                Where every senior finds a caring community and a place to call
                home.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded shadow">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faKitMedical}
                  className="text-4xl items-center text-[#8BC53E]"
                />
              </div>
              <h2 className="text-xl font-bold">Medical Advice</h2>
              <p>Embracing our elders with respect, comfort, and joy.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded shadow">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faRecordVinyl}
                  className="text-4xl items-center text-[#8BC53E]"
                />
              </div>
              <h2 className="text-xl font-bold">Medical Record</h2>
              <p>Embracing our elders with respect, comfort, and joy.</p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <span className="flex flex-row items-center justify-between">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                List of Old Age Homes
              </h2>
              <Link to={"/home-list"} className="text-blue-500 underline">
                View all
              </Link>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              {hm?.length > 0 ? (
                hm.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md">
                    <img
                      src={item.userImageUrl}
                      alt="Old Age Home"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <div className="p-2">
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                      <p className="mt-2 text-gray-600">{item.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No any old age homes found</p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <span className="flex flex-row items-center justify-between">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                List of Orphanages
              </h2>
              <Link to={"/orphanage-list"} className="text-blue-500 underline">
                View all
              </Link>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              {orph?.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <img
                    src={item.userImageUrl}
                    alt="Old Age Home"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="p-2">
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                    <p className="mt-2 text-gray-600">{item.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {campaigns && (
          <section id="campaigns" className="w-full pt-2 md:pb-12 lg:pb-12">
            <div className="flex flex-col w-full md:w-1/4 mx-auto">
              <h2 className="text-4xl font-bold text-center text-[#487410] mb-8 mt-2">
                Upcoming Campaigns
                <div className="border-2 border-solid border-[#242523] mt-2"></div>
              </h2>
            </div>
            <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-6">
              {campaigns.map((campaign) => (
                <div
                  className="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <img
                    src={campaign.campaignImageUrl}
                    height="200"
                    alt="Campaign"
                    className="aspect-[2/1] overflow-hidden rounded-t-xl object-cover"
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-bold">
                      {campaign.campaignName}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-block rounded-full py-1 text-sm font-semibold text-white">
                        {" "}
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-2 text-gray-800"
                        />
                        <span className="text-gray-800 pe-2">
                          {formatDate(campaign.campaignStartDate)}
                        </span>
                        <span className="text-gray-800">----</span>
                        <span className="text-gray-800  ps-2">
                          {formatDate(campaign.campaignEndDate)}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FontAwesomeIcon
                        icon={faLocationCrosshairs}
                        className="mr-2 text-gray-800"
                      />
                      <span>{campaign.campaignLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FontAwesomeIcon
                        icon={faHouseMedical}
                        className="mr-2 text-gray-800"
                      />
                      <span>{campaign.organization?.organizationName}</span>
                    </div>
                    {/* <a
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </a> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
