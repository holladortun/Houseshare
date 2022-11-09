import React from 'react'

const CityCard = ({imagelink,city}) => {
  return (
    <div>
      <div className="relative">
        <img
          src={imagelink}
          alt=""
          className="rounded-lg w-full h-[320px] object-cover "
        />
        <div className="h-[320px] w-full bg-black/50 absolute top-0  z-100 rounded-lg"></div>
        <h3 className="md:text-[25px] absolute bottom-4 left-4 text-white">{city}</h3>
      </div>
    </div>
  );
}

export default CityCard