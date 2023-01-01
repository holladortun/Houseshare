import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileDummy from "../assets/profile_dummy.png";
import { supabase } from "../../supabaseClient";

import { HiBars3BottomRight } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mobileDrawerState } from "../atoms/mobileDrawerAtom";
import { userProfileState } from "../atoms/userProfile";
import { BsFillBellFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { messagesState } from "../atoms/messagesAtom";
import MessagesCard from "./MessagesCard";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import NotificationsCard from "./NotificationsCard";
import { readMessagePopUpState } from "../atoms/readMessagePopUpAtom";
import { notificationsState } from "../atoms/notificationsAtom";
import { clickedMessageState } from "../atoms/clickedMessageAtom";
import useSWR from "swr";
import { useMessages } from "../swr/useMessages";
import { authSessionState } from "../atoms/authSessionAtom";
import { useUserProfile } from "../swr/useUserProfile";
import { useNotifications } from "../swr/useNotifications";
import SingleProperty from "../pages/SingleProperty";

const AccountNavbar = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(mobileDrawerState);
  const [isMessagesClicked, setIsMessagesClicked] = useState(false);
  const [isNotificationsClicked, setIsNotificationsClicked] = useState(false);
  const setClickedMessage = useSetRecoilState(clickedMessageState);
  const notifications = useRecoilValue(notificationsState);
  // const userProfile = useRecoilValue(userProfileState);
  const { user } = useRecoilValue(authSessionState);
  const { data: messagesData } = useMessages(user);
  const { data: notificationsData } = useNotifications(user);
  const { data: userProfileNew } = useUserProfile(user);
  // const [messages, setMessages] = useRecoilState(messagesState);

  const setReadMessagePopUp = useSetRecoilState(readMessagePopUpState);

  let singleMessage;

  const handleReadMessage = async (id) => {
    try {
      singleMessage = await messagesData.filter((message) => {
        return message.id == id;
      });

      setClickedMessage(singleMessage);
      await readReceipt();
      setReadMessagePopUp(true);

      await insertNotification();

      const readMessage = messagesData.filter((message) => {
        return message.id !== id;
      });
      //  setMessages(readMessage);
      console.log(readMessage);
    } catch (error) {
    } finally {
    }
  };
  const readReceipt = async () => {
    try {
      console.log("i ran");

      const { error } = await supabase
        .from("messages")
        .update({ read: "yes" })
        .eq("id", singleMessage[0]?.id);
      if (error) throw error;
    } catch (error) {
      alert(`${error.message} reciept`);
    }
  };

  const insertNotification = async () => {
    try {
      const { error } = await supabase.from("notifications").insert({
        type: 1,
        trigger_id: user.id,
        recipient_id: singleMessage[0]?.sender_id.id,
      });
      if (error) throw error;
    } catch (error) {
      alert(`${error.message} notification`);
    }
  };

  const handleReadNotification = () => {};

  return (
    <div className="sticky top-0 bg-white z-10 ">
      <div className="overflow-hidden md:overflow-visible px-[20px] md:px-[40px]  2xl:px-[20px] py-6 flex justify-between items-center shadow-md ">
        <Link to="/" className="hidden md:block">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
          </div>
        </Link>

        <div className="flex items-center gap-8 w-[100%] md:justify-end justify-between">
          <div className="  md:hidden flex items-center  justify-between gap-4">
            <img
              src={
                userProfileNew?.profile_pictureurl
                  ? userProfileNew?.profile_pictureurl
                  : ProfileDummy
              }
              alt=""
              className=" rounded-full w-[40px] h-[40px] object-cover border-brandblue border"
            />
            <h5 className="hidden">Hello {userProfileNew?.first_name}</h5>
          </div>
          <div>
            <div className="md:flex items-center gap-5 text-2xl text-[#7F7F7F] hidden">
              <div className="relative flex items-start">
                <BsFillBellFill
                  className="cursor-pointer"
                  id="notificationicon"
                  onClick={() => {
                    setIsNotificationsClicked(!isNotificationsClicked);
                    setIsMessagesClicked((prevState) => {
                      prevState == true ? false : null;
                    });
                  }}
                />
                <Tooltip
                  anchorId="notificationicon"
                  content={`You have ${notificationsData?.length} notifications`}
                  className="text-[12px] bg-brandblue py-1.5"
                />
                <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                  {notificationsData != null ? notificationsData.length : 0}
                </p>

                {/* notifications popup */}
                {isNotificationsClicked ? (
                  <div
                    className={
                      isNotificationsClicked
                        ? "absolute w-[500px] ml-[-300px]   top-[160%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-in max-h-[400px] overflow-scroll"
                        : "absolute invisible w-[500px] ml-[-300px] top-[100%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-out"
                    }
                  >
                    <div className="flex justify-between items-center px-5 pb-4 f">
                      <h4 className="font-bold text-black text-[20px]">
                        Notifications
                      </h4>
                      <p className="text-[16px]"></p>
                    </div>
                    {notificationsData?.length == 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="py-12">You have no notifications</p>
                      </div>
                    ) : (
                      notificationsData.map((notification, i) => {
                        return (
                          <NotificationsCard
                            notification={notification}
                            key={i}
                            handleReadNotification={handleReadNotification}
                          />
                        );
                      })
                    )}
                  </div>
                ) : null}
              </div>
              <div className=" flex items-start relative ">
                <IoMdMail
                  className="cursor-pointer"
                  onClick={() => {
                    setIsMessagesClicked(!isMessagesClicked);
                    setIsNotificationsClicked((prevState) => {
                      prevState == true ? false : null;
                    });
                  }}
                  id="mailicon"
                />
                <Tooltip
                  anchorId="mailicon"
                  content={`You have ${messagesData?.length} unread messages`}
                  className="text-[12px] bg-brandblue py-1.5"
                />
                <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                  {messagesData != null ? messagesData.length : 0}
                </p>

                {/* messages popup */}
                {isMessagesClicked ? (
                  <div
                    className={
                      isMessagesClicked
                        ? "absolute w-[500px] ml-[-300px]   top-[160%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-in max-h-[400px] overflow-scroll"
                        : "absolute invisible w-[500px] ml-[-300px] top-[100%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-out"
                    }
                  >
                    <div className="flex justify-between items-center px-5 pb-4 f">
                      <h4 className="font-bold text-black text-[20px]">
                        Messages
                      </h4>
                      <p className="text-[16px]"></p>
                    </div>
                    {messagesData?.length == 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="py-12">You have no messages</p>
                      </div>
                    ) : (
                      messagesData.map((message, i) => {
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
          </div>
          <div className=" hidden md:flex  items-center  justify-between gap-4">
            <img
              src={
                userProfileNew?.profile_pictureurl
                  ? userProfileNew?.profile_pictureurl
                  : ProfileDummy
              }
              alt=""
              className=" rounded-full w-[40px] h-[40px] object-cover border-brandblue border"
            />
            <h5 className="text-black block">
              Hello {userProfileNew?.first_name}
            </h5>
          </div>

          <div className="md:hidden flex gap-3">
            <div className="flex items-center gap-5 text-2xl text-[#7F7F7F] ">
              <div className="relative flex items-start">
                <BsFillBellFill
                  className="cursor-pointer"
                  id="notificationicon"
                />
                <Tooltip
                  anchorId="notificationicon"
                  content={`You have ${notifications?.length} notifications`}
                  className="text-[12px] bg-brandblue py-1.5"
                />
                <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                  {notifications != null ? notifications.length : 0}
                </p>
              </div>
              <div className=" flex items-start relative ">
                <IoMdMail
                  className="cursor-pointer"
                  onClick={() => {
                    setIsMessagesClicked(!isMessagesClicked);
                  }}
                  id="mailicon"
                />
                <Tooltip
                  anchorId="mailicon"
                  content={`You have ${messagesData?.length} unread messages`}
                  className="text-[12px] bg-brandblue py-1.5"
                />
                <p className="text-[12px] bg-brandblue text-white px-2 py-0 rounded-full ml-[-10px] mt-[-12px]">
                  {messagesData != null ? messagesData.length : 0}
                </p>
              </div>
            </div>
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

        {/* mobile messages popup */}
        {isMessagesClicked ? (
          <div
            className={
              isMessagesClicked
                ? "md:hidden absolute  w-[90%]  mx-auto top-[90%] right-0 left-0 bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-in max-h-[400px] overflow-scroll"
                : "absolute invisible w-[500px] ml-[-300px] top-[100%] bg-white shadow-xl rounded-lg py-6  flex flex-col divide-y transition-[top] duration-500 ease-out"
            }
          >
            <div className="flex justify-between items-center px-5 pb-4 f">
              <h4 className="font-bold text-black text[18px] md:text-[20px]">
                Messages
              </h4>
            </div>
            {messagesData.length == 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="py-4 text-[15px]">You have no messages</p>
              </div>
            ) : (
              messagesData.map((message, i) => {
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
  );
};

export default AccountNavbar;
