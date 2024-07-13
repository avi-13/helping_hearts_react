import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleUserApi, updateUserApi } from "../../apis/api";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    number: "",
  });
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch user details
  useEffect(() => {
    getSingleUserApi(id).then((res) => {
      const { user } = res.data;
      setUserData({
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        number: user.number,
        userImageUrl : user.userImageUrl
      });
      setPreviewImage(user.userImageUrlUrl);
    });
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserImageUrl(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("number", userData.number);

    if (userImageUrl) {
      formData.append("userImageUrl", userImageUrl);
    }

    updateUserApi(id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Server Error");
      });
  };

  return (
    <section className="py-10 mt-36 dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
            Profile
          </h1>
          <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
            Update Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col justify-start">
            <div className="w-full flex flex-row justify-start bg-[#E4F2D1]">
              <div
                className="w-[190px] h-[150px] rounded-full cursor-pointer shadow-lg overflow-hidden bg-blue-300/20"
                style={{
                  backgroundImage: `url(${
                    userData?.userImageUrl ||
                    previewImage ||
                    "/assets/images/profile.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() =>
                  document.getElementById("upload_profile").click()
                }
              >
                <input
                  type="file"
                  id="upload_profile"
                  hidden
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-row w-full px-4 items-center justify-between">
                <div className="flex flex-row justify-between">
                  <h2 className="font-bold text-2xl">{userData.username}</h2>
                </div>
                <div>
                  <Link
                    onClick={(e) => {
                      console.log("Clicked");
                    }}
                    className="bg-[#8BC53E] px-10 py-4 rounded-md hover:bg-[#487410]"
                  >
                    Update Your Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full col-md-6 mb-4 mt-6">
                <label for="" className="dark:text-gray-300">
                  Fullname
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                  value={userData.fullName}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Fullname"
                />
              </div>
              <div className="w-full mb-4 mt-6">
                <label for="mb-2" className=" dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  value={userData.email}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Email"
                />
              </div>
              <div className="w-full mb-4 mt-6">
                <label for="" className="dark:text-gray-300">
                  Number
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData({ ...userData, number: e.target.value })
                  }
                  value={userData.number}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Number"
                />
              </div>
              {/* <div className="w-full mb-4 mt-6">
                <label for="" className="dark:text-gray-300">
                  Fullname
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                  value={userData.fullName}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Fullname"
                />
              </div> */}
            </div>
            <div className="w-full flex flex-row justify-center  mt-4 text-white text-lg font-semibold">
              <button
                type="submit"
                className="w-[1/2] rounded-lg bg-[#8BC53E] hover:bg-[#487410] px-24 py-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
