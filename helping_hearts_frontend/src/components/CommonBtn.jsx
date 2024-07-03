import React from "react";

const CommonBtn = ({ label, className }) => {
  return (
    <button
      type="submit"
      className={
        className
          ? className
          : "w-full bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#6aa023] transition duration-300"
      }
    >
      {label}
    </button>
  );
};

export default CommonBtn;
