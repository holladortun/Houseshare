import React from "react";
import firsthome from "../../public/firsthome.jpg";
import profilepic from "../../public/profilepic.jpg";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { useRecoilValue, useRecoilState } from "recoil";
import { propertyImageState } from "../atoms/propertyImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { userListingsState } from "../atoms/userListingsAtom";
import { userProfileState } from "../atoms/userProfile";
import TimeAgo from "timeago-react";





const UserListingsCard = () => {
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

  const userProfile = useRecoilValue(userProfileState);

  let apartments;

  if (userProfile) {
    apartments = userProfile.apartments;
    console.log(apartments);
  }

  console.log(apartments);
  return (
    //<div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-8">
    <Carousel responsive={responsive}>
      {apartments.map((property) => {
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

                <h4 className="w-[80%] my-6">{property.description}</h4>
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
    </Carousel>
    // </div>
  );
};

export default UserListingsCard;
