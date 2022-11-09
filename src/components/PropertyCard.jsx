import React from 'react'
import firsthome from '../../public/firsthome.jpg'
import profilepic from '../../public/profilepic.jpg'
import {FaBath} from 'react-icons/fa'
import {FaBed} from 'react-icons/fa'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillClockFill} from 'react-icons/bs'

const PropertyCard = () => {
  return (
    <div className=" mb-10 shadow-lg rounded-b-lg">
      <div className="relative">
        <img
          src={firsthome}
          alt=""
          className="rounded-t-lg w-full h-[250px] object-cover"
        />
        <div className="h-[250px] w-full bg-black/50 absolute top-0  z-100 rounded-t-lg"></div>
        <img
          src={profilepic}
          alt=""
          className="  absolute w-12 h-12 object-cover 
         rounded-full top-3 left-3"
        />
      </div>

      <div className="flex flex-col px-[10px] divide-y-2 divide-gray-100 pt-6">
        <div>
          <div className="flex justify-between">
            <h4 className="font-bold text-xl">
              #500,000
              <span className="text-[13px] font-[400] bg-brandblue text-white px-4 ml-4 rounded-md py-1">
               Male
              </span>
            </h4>
            <div className="flex items-center gap-1">
              <BsFillClockFill className="text-black/50" />
              <p className="text-black/50 text-[14px]">3 days ago</p>
            </div>
          </div>

          <h4 className="w-[80%] my-6">
            Looking for a roommate for a clean two bedroom flat
          </h4>
        </div>

        <div className="flex justify-between py-4 rounded-b-lg ">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <FaBath className="text-black/50" />
              <p className="text-black/50 text-[17px]">2</p>
            </div>
            <div className="flex items-center gap-1">
              <FaBed className="text-black/50" />
              <p className="text-black/50 text-[17px]">2</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-brandblue" />
            <h4>Epe</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard