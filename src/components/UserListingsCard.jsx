import React from "react";
import { useState } from "react";
import firsthome from "../../public/firsthome.jpg";
import profilepic from "../../public/profilepic.jpg";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit, MdExitToApp } from "react-icons/md";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { propertyImageState } from "../atoms/propertyImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { userListingsState } from "../atoms/userListingsAtom";
import { userProfileState } from "../atoms/userProfile";
import { useUserProfile } from "../swr/useUserProfile";
import TimeAgo from "timeago-react";
import UploadApartments from "./UploadApartments";
import { EmailIcon } from "react-share";
import { editedListingState } from "../atoms/editListingAtom";

import EditListingForm from "./EditListingForm";

const UserListingsCard = () => {
  const [editListing, setEditListing] = useState(false);
  const setEditedListing = useSetRecoilState(editedListingState);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { user } = JSON.parse(
    localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
  );
  const { data: userProfile } = useUserProfile(user);

  let apartments;
  let orderedByLastest;
  let editedListing;

  if (userProfile) {
    apartments = userProfile?.apartments;
    orderedByLastest = [...apartments].reverse();
  }

  const handleEdit = (id) => {
    setEditListing(!editListing);
    editedListing = orderedByLastest.filter((listing) => {
      return listing.id == id;
    });
    const singleEditedListing = editedListing[0];
    setEditedListing(singleEditedListing);
  };

  return (
    <div className="relative overflow-hidden ">
      <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-2 relative mt-10">
        {/* <Carousel responsive={responsive}> */}
        {orderedByLastest?.map((property) => {
          return (
            <div className="mx-2">
              <div className="relative border-none">
                <img
                  src={property.propertyimageurl}
                  alt=""
                  className="rounded-t-lg w-full h-[250px] object-cover"
                />
                <div className="h-[250px] w-full bg-black/50 absolute top-0  z-100 rounded-t-lg"></div>
                <img
                  src={userProfile.profile_pictureurl}
                  alt=""
                  className="  absolute w-12 h-12 object-cover 
            rounded-full top-3 left-3"
                />

                <div className="absolute top-[-15px] right-3 flex items-center gap-2">
                  <button onClick={() => handleEdit(property.id)}>
                    <MdEdit className="text-white bg-brandblue/60 hover:bg-brandblue transition-colors duration-300 ease-in rounded-full text-[35px] p-2 cursor-pointer " />
                  </button>
                  <AiFillDelete className="text-white bg-brandblue/60 hover:bg-brandblue transition-colors duration-300 ease-in rounded-full text-[35px] p-2 cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col px-[10px] divide-y-2 divide-gray-100 pt-6 bg-white mb-10 shadow-lg rounded-b-lg ">
                <div>
                  <div className="flex justify-between">
                    <h4 className="font-bold text-xl">
                      #{property.amount}
                      <span className="text-[13px] font-[400] bg-brandblue text-white px-4 ml-4 rounded-md py-1">
                        {property.gender}
                      </span>
                    </h4>
                    <div className="flex items-center gap-1">
                      <BsFillClockFill className="text-black/50" />
                      <TimeAgo
                        className="text-black/50 text-[14px]"
                        datetime={property.created_at}
                        locale="EN_US"
                      />
                    </div>
                  </div>

                  <h4 className="w-[80%] my-6">
                    {property.description.slice(0, 35) + "..."}
                  </h4>
                </div>

                <div className="flex justify-between py-4 rounded-b-lg ">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-1">
                      <FaBath className="text-black/50" />
                      <p className="text-black/50 text-[17px]">
                        {property.toilet}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBed className="text-black/50" />
                      <p className="text-black/50 text-[17px]">
                        {property.bathroom}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-brandblue" />
                    <h4>{property.location}</h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* </Carousel> */}
      </div>
      <div
        className={
          editListing
            ? "fixed h-[90%] top-[0%] right-[0%] transition-all duration-500 ease-out mt-[80px] overflow-scroll rounded-xl "
            : "fixed top-[0%] right-[-100%] transition-all duration-500 ease-in mt-[80px] overflow-scroll"
        }
      >
        <EditListingForm />
      </div>
    </div>
  );
};

export default UserListingsCard;
