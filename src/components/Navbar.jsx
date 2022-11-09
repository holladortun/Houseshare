import React from "react";
import { AiOutlineHome } from "react-icons/ai";

import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="px-[20px] md:px-[40px]  2xl:px-[100px] py-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <AiOutlineHome className="text-3xl text-brandblue" />
        <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
      </div>
      <div>
        <HiBars3BottomRight className="text-3xl md:text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
