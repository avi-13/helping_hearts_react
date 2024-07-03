import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { fetchAllOrganizationsApi } from "../apis/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OldAgeHomeList = () => {
  const [oldAgeHome, setOldAgeHome] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrganizations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllOrganizationsApi();
      setOldAgeHome(response.data?.allOldAgeHomes ?? []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrganizations();
  }, [fetchAllOrganizations]);

  if (isLoading)
    return (
      <>
        <CircularProgress />
      </>
    );
  if (error) return <p>Error loading the data!</p>;

  return (
    <div className="flex flex-col items-center mt-24 p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">
        List of all the Old Age Homes
      </h2>
      <p className="text-gray-700 mb-6">
        Let's know more! Necessitatibus dolor asperiores autem possimus sint
        voluptas incidunt molestias nostrum laudantium. Maxime porro cumque
        quaerat.
      </p>
      {oldAgeHome.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {oldAgeHome.map((home) => (
            <div key={home._id} className="bg-white rounded shadow-xl p-4">
              <img
                className="w-full h-48 object-cover rounded mb-4"
                src={home.userImageUrl}
                alt={home.organizationName}
              />
              <h3 className="text-lg font-bold mb-2">
                {home.organizationName}
              </h3>
              <p className="text-gray-700 mb-4">{home.mission}</p>
              <Link to={`/single-organization/${home._id}`} className="inline-block bg-[#8BC53E] text-white text-xs cursor-pointer font-bold px-4 py-2 rounded">
                View All
                <span className="ms-2"><FontAwesomeIcon icon={faArrowCircleRight} /></span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-24">No Old Age Homes found</p>
      )}
    </div>
  );
};

export default OldAgeHomeList;
