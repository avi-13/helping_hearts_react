import {
  faEdit,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDonationApi, getMyDonationApi } from "../../apis/api";

const History = () => {
  const { id } = useParams();
  const [donations, setdonations] = useState([]);
  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [donationII, setdonationII] = useState("");

  // delete
  const handleDelete = (id) => {
    // make Api call
    deleteDonationApi(id)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          closedeleteModal(true);
          setdonations(donations.filter((item) => item._id !== id));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const fetchdonations = async () => {
      try {
        const response = await getMyDonationApi(id);
        setdonations(response?.data?.userDonation);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchdonations();
  }, [id]);

  return (
    <div className="mt-32 min-h-[290px] p-5">
      <h2 className="text-center font-bold text-3xl mb-6">
        My donations History
      </h2>
      {donations?.length ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-[#8BC53E] text-white">
                <th className="py-2 px-4 border border-white">Image One</th>
                <th className="py-2 px-4 border border-white">Image Two</th>
                <th className="py-2 px-4 border border-white">Fullname</th>
                <th className="py-2 px-4 border border-white">Organization Name</th>
                <th className="py-2 px-4 border border-white">Items to Donate</th>
                <th className="py-2 px-4 border border-white">Category</th>
                <th className="py-2 px-4 border border-white">Quantity</th>
                <th className="py-2 px-4 border border-white">Preferred Date</th>
                <th className="py-2 px-4 border border-white">Preferred Time</th>
                <th className="py-2 px-4 border border-white">Donation Method</th>
                <th className="py-2 px-4 border border-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-b">
                  <td className="py-2 px-4">
                    <img src={donation.imageOne} alt="donation" className="w-20 h-10 object-cover mx-auto" />
                  </td>
                  <td className="py-2 px-4">
                    <img src={donation.imageOne} alt="donation" className="w-20 h-10 object-cover mx-auto" />
                  </td>
                  <td className="py-2 px-4">{donation.fullName}</td>
                  <td className="py-2 px-4">{donation.organizationName}</td>
                  <td className="py-2 px-4">{donation.itemsToDonate}</td>
                  <td className="py-2 px-4">{donation.categoryOfSupplies}</td>
                  <td className="py-2 px-4">{donation.quantity}</td>
                  <td className="py-2 px-4">{donation.preferredDate}</td>
                  <td className="py-2 px-4">{donation.preferredTime}</td>
                  <td className="py-2 px-4">{donation.donationMethod}</td>
                  <td className="py-2 px-4 flex justify-center items-center space-x-2">
                    <Link className="text-blue-500 hover:text-blue-700" to={`/edit-donation/${donation._id}`}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button onClick={() => { opendeleteModal(); setdonationII(donation._id); }} className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No donations found... 🥲
        </div>
      )}
      {isdeleteModalOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h6 className="text-center font-medium">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              Are you sure you want to delete this donation?
            </h6>
            <div className="flex justify-around">
              <button onClick={() => handleDelete(donationII)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Delete</button>
              <button onClick={closedeleteModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
