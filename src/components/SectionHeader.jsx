import React from 'react'
import line from "../../public/line.png";

const SectionHeader = ({title,subtitle}) => {
  return (
    <div className="mb-6">
      <div className='flex items-center gap-2 justify-start'>
        <img src={line} alt="" className='w-[32px]  ' />
        <h5 className="text-brandblue text-[14px] font-[500] uppercase">{subtitle}</h5>
      </div>
      <div>
        <h3 className='capitalize'>{title}</h3>
      </div>
    </div>
  );
}

export default SectionHeader