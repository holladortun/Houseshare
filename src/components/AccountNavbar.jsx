import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileDummy from "../assets/profile_dummy.png";

import { HiBars3BottomRight } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mobileDrawerState } from "../atoms/mobileDrawerAtom";
import { userProfileState } from "../atoms/userProfile";
import { BsFillBellFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { messagesState } from "../atoms/messagesAtom";
import MessagesCard from "./MessagesCard";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

import { readMessagePopUpState } from "../atoms/readMessagePopUpAtom";

import { clickedMessageState } from "../atoms/clickedMessageAtom";

const AccountNavbar = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(mobileDrawerState);
  const [isClicked, setIsClicked] = useState(false);

  const setClickedMessage = useSetRecoilState(clickedMessageState);

  const userProfile = useRecoilValue(userProfileState);

  const [messages, setMessages] = useRecoilState(messagesState);
  //console.log(profile_pictureurl);

  const setReadMessagePopUp = useSetRecoilState(readMessagePopUpState);

  const handleReadMessage = (id) => {
    try {
      setReadMessagePopUp(true);

      const clickedMessage = messages.filter((message) => {
        return message.id == id;
      });
      setClickedMessage(clickedMessage);
      console.log(clickedMessage);
      if (error) throw error;
    } catch (error) {
    } finally {
      const readMessage = messages.filter((message) => {
        return message.id !== id;
      });
      setMessages(readMessage);
    }
  };

  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="px-[20px] md:px-[40px]  2xl:px-[20px] py-6 flex justify-between items-center shadow-md ">
        <Link to="/">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-5 text-2xl text-[#7F7F7F]">
            <div className="relative flex items-start">
              <BsFillBellFill />
              <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                5
              </p>
            </div>
            <div className=" flex items-start relative ">
              <IoMdMail
                className="cursor-pointer"
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
                id="mailicon"
              />
              <Tooltip
                anchorId="mailicon"
                content={`You have ${messages?.length} unread messages`}
                className="text-[12px] bg-brandblue py-1.5"
              />
              <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                {messages != null ? messages.length : 0}
              </p>

              {isClicked ? (
                <div
                  className={
                    isClicked
                      ? "absolute w-[500px] ml-[-300px]   top-[160%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-in h-[400px] overflow-scroll"
                      : "absolute invisible w-[500px] ml-[-300px] top-[100%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-out"
                  }
                >
                  <div className="flex justify-between items-center px-5 pb-4 f">
                    <h4 className="font-bold text-black text-[20px]">
                      Messages
                    </h4>
                    <p className="text-[16px]">Mark all as read</p>
                  </div>
                  {messages.length == 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p>You have no messages</p>
                    </div>
                  ) : (
                    messages.map((message, i) => {
                      return (
                        <MessagesCard
                          message={message}
                          key={i}
                          handleReadMessage={handleReadMessage}
                        />
                      );
                    })
                  )}
                </div>
              ) : null}
            </div>
          </div>
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
