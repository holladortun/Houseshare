import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
  
    <div className="px-[20px] md:px-[40px]  2xl:px-[100px] py-4 flex justify-between items-center shadow-md relative ">
      <Link to="/">
        <div className="flex items-center gap-2">
          <AiOutlineHome className="text-3xl text-brandblue" />
          <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
        </div>
      </Link>

      <div className="hidden xl:flex items-center  justify-end w-[100%] gap-24">
        <div className="flex gap-12">
          <Link to="/home">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="bg-gray-200 px-8 py-2 rounded-md">
            Login
          </Link>
          <Link to="/register" className="btnlg">
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile menu */}

      <div
        className={
          isOpen
            ? " xl:hidden flex flex-col items-end px-5 py-4 fixed  top-0 right-0 bg-white h-[100vh] z-[1000] w-[80%] transition-all ease-in duration-500"
            : " xl:hidden flex flex-col items-end px-5 py-4 absolute  top-0 right-[-100%] bg-white h-[100vh] z-10 w-full overflow-x-hidden transition-all ease-out duration-500"
        }
      >
        <div>
          {/* <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
          </div> */}
          <button onClick={() => setisOpen(false)}>
            <div className=" mt-2 p-2 xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer rounded-lg">
              <GrClose className="text-2xl md:text-4xl " />
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-4 text-lg items-end mt-8">
          <Link to="/home">Home</Link>
          <Link to="/apartments">Apartments</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="flex flex-col mt-20 items-end gap-4">
          <Link to="/login" className="bg-gray-200 px-8 py-2 rounded-md">
            Login
          </Link>
          <Link to="/register" className="btnlg">
            Get Started
          </Link>
        </div>
      </div>

      <button onClick={() => setisOpen(true)}>
        <div className=" p-2 xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer rounded-lg">
          <HiBars3BottomRight className="text-3xl md:text-4xl " />
        </div>
      </button>
    </div>
  );
};

export default Navbar;
