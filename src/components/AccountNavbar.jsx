import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileDummy from "../assets/profile_dummy.png";

import { HiBars3BottomRight } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { useRecoilState, useRecoilValue } from "recoil";
import { mobileDrawerState } from "../atoms/mobileDrawerAtom";
import { userProfileState } from "../atoms/userProfile";

const AccountNavbar = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(mobileDrawerState);

  const userProfile = useRecoilValue(userProfileState);

  //console.log(profile_pictureurl);

  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="px-[20px] md:px-[40px]  2xl:px-[20px] py-6 flex justify-between items-center shadow-md ">
        <Link to="/">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className=" flex items-center  justify-between gap-4">
            <img
              src={
                userProfile?.profile_pictureurl
                  ? userProfile?.profile_pictureurl
                  : ProfileDummy
              }
              alt=""
              className=" rounded-full w-[40px] h-[40px] object-cover border-brandblue border"
            />
            <h5 className="hidden xl:block">Hello {userProfile?.first_name}</h5>
          </div>

          <div className="xl:hidden">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              className="hover:animate-spin"
            >
              {menuOpen ? (
                <GrClose className="text-3xl md:text-4xl " />
              ) : (
                <HiBars3BottomRight className="text-3xl md:text-4xl cursor-pointer " />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
