import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

const TestimonialCard = ({jobtitle,name, image, location,review}) => {
  return (
    <div className='p-5 border rounded-xl shadow-md'>
      <div className="flex gap-6">
        <img
          src={image}
          alt=""
          className="rounded-xl w-16 h-16 object-cover object-top"
        />
        <h4 className="font-[600] text-[20px]">
          
          {name}
          <span className="block font-[400] text-gray-600 text-[16px]">
           {jobtitle}
          </span>
        </h4>
      </div>
      <p className="text-[16px] mt-8">
        
        {review}
      </p>
      <div className="flex items-center gap-1 mt-5">
        <FaMapMarkerAlt className="text-brandblue" />
        <h4>{location}</h4>
      </div>
    </div>
  );
}

export default TestimonialCard