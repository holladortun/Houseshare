import React from "react";
import { useState, useEffect } from "react";
import AccountNavbar from "../../components/AccountNavbar";

import { supabase } from "../../../supabaseClient";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import navitems from "../../utils/navitems";
import { preferences } from "../../utils/navitems";
import SideBarNav from "../../components/SideBarNav";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { mobileDrawerState } from "../../atoms/mobileDrawerAtom";
import { authSessionState } from "../../atoms/authSessionAtom";
import { userState } from "../../atoms/userAtom";
import { userListingsState } from "../../atoms/userListingsAtom";
import { userProfileState } from "../../atoms/userProfile";
import { messagesState } from "../../atoms/messagesAtom";
import { bookmarksState } from "../../atoms/bookmarksAtom";
import ReadMessagePopUp from "../../components/ReadMessagePopUp";

const Account = () => {
  const navigate = useNavigate();
  const handleLogoutNavigation = () => navigate("/login");

  const menuOpen = useRecoilValue(mobileDrawerState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const user = useRecoilValue(userState);
  const setuserListingsState = useSetRecoilState(userListingsState);
  const [bookmarks, setbookmarks] = useRecoilState(bookmarksState);
  //console.log(id);
  // const setauthSessionState = useSetRecoilState(authSessionState);

  /* useEffect(() => {
    if (user == false) {
      console.log("not null");
      handleLoginNavigation();
    }
  }, [user]); */

  useEffect(() => {
    getUserProfile();
    getMessages();

    // getListings();
  }, []);

  const getUserProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*,apartments(*)`)
      .eq("id", user.id)
      .single(); /*  */

    setUserProfile(data);

    console.log(userProfile);

    if (error) throw error;
  };

  const getMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(`*,sender_id(*),apartments(propertyimageurl)`)
      .eq("receiver_id", userProfile.id)
      .order("created_at", { ascending: false });

    setMessages(data);
  };

  /* const getMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("reciever_id", user.id);

    setMessages(data);
    console.log(messages);

    if (error) throw error;
  }; */
  /*   const getListings = async () => {
    try {
      const { data, error } = await supabase
        .from("apartments")
        .select()
        //.limit(3)
        .order("id", {
          ascending: false,
        })
        .eq("author_id", user.id);
      if (error) throw error;
      if (data != null) {
        setuserListingsState(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }; */

  /* const result = useQuery("userProfileFetch", async () => {
    const { error, data } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
 */
  /*  console.log(result);

  console.log(userProfile);
 */

  console.log(messages);
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
      } else {
        alert("You have been logged out");
        handleLogoutNavigation();
        //  setauthSessionState(null);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUserProfile(null);
    }
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(location);
  };

  //  <button onClick={handleSignOut}>Log Out</button>;
  return (
    <div>
      <AccountNavbar />
      <div className=" bg-[#F5F8FF]  flex-col flex items-start pb-40 ">
        <div className="hidden w-[15%] xl:flex flex-col items-center bg-white px-[30px] h-[100vh] fixed">
          <div className="w-[100%]">
            <h4 className="self-start  tracking-widest my-4 text-[12px] text-black/60">
              MAIN MENU
            </h4>
            <div className="w-[100%] flex flex-col gap-1">
              {navitems.map((navitem) => {
                return (
                  <SideBarNav
                    item={navitem.item}
                    Icon={navitem.Icon}
                    link={navitem.link}
                  />
                );
              })}
            </div>
            <h4 className="self-start   tracking-widest my-4 text-[12px] text-black/60">
              PREFERENCES
            </h4>
            <div className="w-[100%] flex flex-col gap-1">
              {preferences.map((navitem) => {
                return (
                  <SideBarNav
                    item={navitem.item}
                    Icon={navitem.Icon}
                    link={navitem.link}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col self-start gap-1 mt-16 ">
            <Link
              className="flex items-center text-[16px] gap-4 text-white bg-brandblue  rounded-md py-3 px-4 "
              onClick={handleSignOut}
            >
              <RiLogoutCircleLine className="text-[20px]" />
              LogOut
            </Link>
          </div>
        </div>

        {/* Mobile side nav */}
        <div
          className={
            menuOpen
              ? "w-[80%] sm:w-[35%] md:w-[30%] lg:w-[25%] xl:hidden flex flex-col items-center bg-white px-[30px] h-[100vh] fixed z-20 shadow-lg ease-in transition-all duration-500 left-0"
              : "w-[80%] xl:hidden flex flex-col items-center bg-white px-[30px] h-[100vh] fixed z-20 shadow-lg left-[-100%] transition-all ease-out duration-500"
          }
        >
          <div className="w-[100%]">
            <h4 className="self-start  tracking-widest my-4 text-[12px] text-black/60">
              MAIN MENU
            </h4>
            <div className="w-[100%] flex flex-col gap-1">
              {navitems.map((navitem) => {
                return (
                  <SideBarNav
                    item={navitem.item}
                    Icon={navitem.Icon}
                    link={navitem.link}
                  />
                );
              })}
            </div>
            <h4 className="self-start   tracking-widest my-4 text-[12px] text-black/60">
              PREFERENCES
            </h4>
            <div className="w-[100%] flex flex-col gap-1">
              {preferences.map((navitem) => {
                return (
                  <SideBarNav
                    item={navitem.item}
                    Icon={navitem.Icon}
                    link={navitem.link}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col self-start gap-1 mt-16 ">
            <Link
              className="flex items-center text-[16px] gap-4 text-white bg-brandblue  rounded-md py-3 px-4 "
              onClick={handleSignOut}
            >
              <RiLogoutCircleLine className="text-[20px]" />
              LogOut
            </Link>
          </div>
        </div>

        <div className="items-center justify-center w-full">
          <Outlet />
          <ReadMessagePopUp />
        </div>
      </div>
    </div>
  );
};

export default Account;
