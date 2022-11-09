import React from 'react'
import { AiOutlineHome } from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" bg-lightbg pt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-[40px] 2xl:px-[100px]">
        <div>
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl">Houseshare</h4>
          </div>
        </div>
        <div>
          <h4 className="font-[500] text-[20px]">Say Hello</h4>
          <p className="text-[16px]">support@houseshare.com</p>
          <p className="text-[16px]">+234 00000000</p>
        </div>
        <div>
          <h4 className="font-[500] text-[20px]">Visit Us</h4>
          <p className="text-[16px]">
            Somewhere Only We Know
            <br />
            Lekki,Lagos
            <br />
            Nigeria
          </p>
        </div>
        <div>
          <h4 className="font-[500] text-[20px]">Quick Links</h4>
          <p className="text-[16px]">Home</p>
          <p className="text-[16px]">Apartments</p>
          <p className="text-[16px]">Blog</p>
          <p className="text-[16px]">Register</p>
          <p className="text-[16px]">Login</p>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between bg-brandblue gap-2 py-4 mt-10 2xl:px-[100px]">
          <div className="flex justify-around gap-4 xl:order-2">
            <p className="text-[15px] text-white">Privacy Notice</p>
            <p className="text-[15px] text-white">Terms of Use</p>
            <p className="text-[15px] text-white">FAQs</p>
          </div>
          <p className="text-[15px] self-center text-white">
            All rights reserved © 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer