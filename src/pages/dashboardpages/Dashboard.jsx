import React from "react";
import PropertyCard from "../../components/PropertyCard";
import { propertyDataState } from "../../atoms/propertyDataAtom";
import { useRecoilValue } from "recoil";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import profileDummy from "../../assets/profile_dummy.png"

const Dashboard = () => {
  const propertyData = useRecoilValue(propertyDataState);

  return (
    <div className="flex w-[100%]">
      <div className="xl:w-[15%] hidden xl:block"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 ">
        <div>
          <h4 className="font-bold text-xl mb-8">Listed Properties</h4>
        </div>

        <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-2">
          {propertyData.map((property) => {
            return (
              <Link to={`/listings/${property.id}`}>
                <div className="mx-2">
                  <div className="relative border-none">
                    <img
                      src={property.propertyimageurl}
                      alt=""
                      className="rounded-t-lg w-full h-[250px] object-cover"
                    />
                    <div className="h-[250px] w-full bg-black/50 absolute top-0  z-100 rounded-t-lg"></div>
                    <img
                      src={
                        property.profiles?.profile_pictureurl
                          ? property.profiles?.profile_pictureurl
                          : profileDummy
                      }
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
              </Link>
            );
          })}
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;
