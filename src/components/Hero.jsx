import React from 'react'


const Hero = () => {




  return (
    <div className=" min-h-[50vh] 2xl:min-h-[80vh] 2xl:px-[100px] bg-cover bg-lightbg px-[20px] md:px-[40px] flex  flex-col justify-center gap-4 items-start">
      <h1>
        Find a roommate <br /> with ease
      </h1>
      <p>
        Need a roommate? <br />
        Get one with east today!
      </p>

      <button className="btnmd mt-8" >
        Get Started
      </button>
    </div>
  );
}

export default Hero