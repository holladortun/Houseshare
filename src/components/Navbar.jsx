import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    /* <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
        <div className="flex justify-between items-center  max-w-screen-xl">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-2xl text-brandblue" />
            <h4 className="font-[700] text-md md:text-2xl">Houseshare</h4>
          </div>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-white bg-brandblue hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Register
            </Link>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-3xl text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <HiBars3BottomRight/>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/apartments">Apartments</Link>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header> */
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
          <Link to="/apartments">Apartments</Link>
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
