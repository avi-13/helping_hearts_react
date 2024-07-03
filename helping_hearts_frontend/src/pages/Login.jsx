import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginNow = (e) => {
    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    e.preventDefault();
    loginUserApi(loginData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.userData);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem("user", jsonDecode);
          const userr = res.data.userData;
          if (userr.isAdmin === false && userr?.isOrganization === false) {
            navigate("/");
            console.log(userr.isAdmin, userr?.isOrganization);
            return;
          } else if (userr.isAdmin === false && userr?.isOrganization === true) {
            navigate("/hh/dashboard");
            window.location.reload();
            return;
          } else {
            navigate("/admin-dashboard");
            window.location.reload();
            return;
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div className="flex items-center mx-20 my-32 justify-center bg-white">
      <div className="bg-[#C7E3C2] shadow-md rounded-lg flex flex-col items-center md:flex-row max-w-4xl w-full">
        <div className="w-full md:w-1/2">
          <img
            src="assets/images/login.png"
            alt="Elderly hands"
            className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Login From Here
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8BC53E]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full pl-10 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8BC53E]"
                />
              </div>
            </div>
            <div className="flex items-baseline justify-center">
              <button
                onClick={loginNow}
                className="px-6 w-full py-2 mt-4 text-white bg-[#8BC53E] rounded-md hover:bg-[#8BC53E]"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
