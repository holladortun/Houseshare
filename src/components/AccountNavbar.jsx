import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileDummy from "../assets/profile_dummy.png";

import { HiBars3BottomRight } from "react-icons/hi2";

const AccountNavbar = () => {
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="px-[20px] md:px-[40px]  2xl:px-[20px] py-6 flex justify-between items-center shadow-md ">
        <div className="flex items-center gap-2">
          <AiOutlineHome className="text-3xl text-brandblue" />
          <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
        </div>
        <div className="hidden xl:flex items-center  justify-between gap-4">
          <img
            src={ProfileDummy}
            alt=""
            className=" rounded-full w-[40px] h-[40px] object-cover border-brandblue border"
          />
          <Link to="/account/properties">Properties</Link>
        </div>

        <div className="xl:hidden">
          <HiBars3BottomRight className="text-3xl md:text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
