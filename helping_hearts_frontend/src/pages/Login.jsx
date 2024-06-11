import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="bg-[#C7E3C2] shadow-lg rounded-lg flex">
      <div className="hidden md:flex md:w-1/2 items-center justify-center rounded-l-lg" >
          <img src={"assets/images/loginImage.png"} alt="Diversity" className="h-[630px] rounded-lg object-cover" />
      </div>
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-semibold text-black text-center">Create Your Account</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="full-name">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8BC53E]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="number">
              Number
            </label>
            <input
              id="number"
              type="text"
              placeholder="Number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8BC53E]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8BC53E]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8BC53E]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8BC53E]"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-[#8BC53E] rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">
              SIGNUP
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          <a href="/login" className="text-sm text-[#8BC53E] hover:text-green-700">
            Already Have An Account? Login
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Login
