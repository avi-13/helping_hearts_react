import {
  faAmbulance,
  faHandHoldingHeart,
  faHospital,
  faKitMedical,
  faRecordVinyl,
  faSquareVirus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

const LandingPage = () => {
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
                <button className="mt-8 w-3/4 md:w-1/2 text-white bg-[#8BC53E] px-6 py-3 rounded">
                  Register Your Orphanage / Old Age Home
                </button>
              </div>
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
            <span className="flex flex-row items-center jusi">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              List of Old Age Homes
            </h2>
            <p className="text-blue-500 underline">View all</p>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              {Array(4)
                .fill({
                  title: "Old Age Home",
                  description: "Description",
                  address: "Address",
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <img
                      src="assets/images/or.png"
                      alt="Old Age Home"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                    <p className="mt-2 text-gray-600">{item.address}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              List of Orphanages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {Array(4)
                .fill({
                  title: "Orphanages",
                  description: "Description",
                  address: "Address",
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <img
                      src="assets/images/or.png"
                      alt="Orphanage"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                    <p className="mt-2 text-gray-600">{item.address}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
