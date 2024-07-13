import React from "react";

const CommonBtn = ({ label, className, onClick}) => {
  return (
    <button
    onClick={onClick}
      className={
        className
          ? className
          : "w-full bg-[#8BC53E] text-white font-semibold rounded-md py-2 shadow-md hover:bg-[#5b9015] transition duration-300"
      }
    >
      {label}
    </button>
  );
};

export default CommonBtn;
