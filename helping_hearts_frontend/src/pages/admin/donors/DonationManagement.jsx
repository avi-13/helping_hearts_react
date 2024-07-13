import React, { useEffect, useState } from "react";
import { getMyDonationApi } from "../../../apis/api";

export default function DonationManagement() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [donation, setDonation] = useState([]);

  const fetchAllDonations = async () => {
    getMyDonationApi(currentUser._id).then((res) => {
      setDonation(res.data.donatedToRequests);
    });
  };

  useEffect(() => {
    fetchAllDonations();
  }, [donation?.length]);

  return (
    <div className="background bg-[#f0f0f0] min-h-[100vh] p-6">
      <div className="container content bg-[#fff] rounded-lg p-6">
        <h2 className="text-center">All the Donations</h2>
        <div className="flex w-100 my-4 gap-2">
          <input
            className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Full Name"
            name="fullName"
          />
          <input
            className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Current Address"
            name="currentAddress"
          />
        </div>

        <div className="table-responsive overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-[#8BC53E] text-white">
              <tr>
                <th className="py-2 px-4 text-left">ImageOne</th>
                <th className="py-2 px-4 text-left">ImageTwo</th>
                <th className="py-2 px-4 text-left">Fullname</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Number</th>
                <th className="py-2 px-4 text-left">District</th>
                <th className="py-2 px-4 text-left">Municipality</th>
                {/* <th className="py-2 px-4 text-left">Donated To</th> */}
                <th className="py-2 px-4 text-left">Items</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Preferred Date</th>
                <th className="py-2 px-4 text-left">Preferred Time</th>
                <th className="py-2 px-4 text-left">Donation Method</th>
                <th className="py-2 px-4 text-left">Donation Status</th>
                <th className="py-2 px-4 text-left">Is Received</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {donation?.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full"
                          src={item.imageOne}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full"
                          src={item.imageTwo}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">{item.fullName || "Null"}</td>
                  <td className="py-2 px-4">{item.username || "Null"}</td>
                  <td className="py-2 px-4">{item.email || "Null"}</td>
                  <td className="py-2 px-4">{item.number || "Null"}</td>
                  <td className="py-2 px-4">{item.district || "Null"}</td>
                  <td className="py-2 px-4">{item.municipality || "Null"}</td>
                  <td className="py-2 px-4">{item.itemsToDonate || "Null"}</td>
                  <td className="py-2 px-4">
                    {item.categoryOfSupplies || "Null"}
                  </td>
                  <td className="py-2 px-4">{item.quantity || "Null"}</td>
                  <td className="py-2 px-4">{item.preferredDate || "Null"}</td>
                  <td className="py-2 px-4">{item.preferredTime || "Null"}</td>
                  <td className="py-2 px-4">{item.donationMethod || "Null"}</td>
                  {item.isAccepted ? (
                    <td className="py-2 px-4 text-green-500 font-semibold">
                      Accepted
                    </td>
                  ) : (
                    <td className="py-2 px-4 text-red-500 font-semibold">
                      Pending
                    </td>
                  )}
                  {item.isRecieved ? (
                    <td className="py-2 px-4 text-green-500 font-semibold">
                      Yes
                    </td>
                  ) : (
                    <td className="py-2 px-4 text-red-500 font-semibold">No</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
