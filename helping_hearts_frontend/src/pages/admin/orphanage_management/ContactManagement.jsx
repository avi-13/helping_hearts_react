import React, { useEffect, useState } from "react";
import { getAllContactByOrgApi } from "../../../apis/api";

export default function ContactManagement() {
  const users = JSON.parse(localStorage.getItem("user"));

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await getAllContactByOrgApi(users._id);
      setContacts(response?.data?.allContacts);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div className="background bg-[#f0f0f0] min-h-[100vh] p-6">
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full"></div>
          <div className="table-responsive overflow-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-[#8BC53E] text-white">
                <tr className="h-16 w-full text-sm leading-none text-white">
                  <th className="font-normal text-left pl-4">Name</th>
                  <th className="font-normal text-left pl-20">UserName</th>
                  <th className="font-normal text-left pl-12">Email</th>
                  <th className="font-normal text-left pl-12">Number</th>
                  <th className="font-normal text-left pl-12">Message</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {contacts?.map((item) => (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.name}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.email}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.username}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.number}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.message}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
