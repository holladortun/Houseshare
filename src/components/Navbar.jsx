import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="px-[20px] md:px-[40px]  2xl:px-[100px] py-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <AiOutlineHome className="text-3xl text-brandblue" />
        <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
      </div>

      <div className="hidden xl:flex items-center  justify-between gap-24">
        <div className="flex gap-12">
          <Link to="/home">Home</Link>
          <Link to="/apartments">Apartments</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/register" className="btnlg">
            Register
          </Link>
          <Link to="/login" className="btnlg">
            Login
          </Link>
        </div>
      </div>

      <div className="xl:hidden">
        <HiBars3BottomRight className="text-3xl md:text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
