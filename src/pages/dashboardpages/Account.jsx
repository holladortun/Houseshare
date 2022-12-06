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

const Account = ({ user }) => {
  const navigate = useNavigate();
  const handleLogoutNavigation = () => navigate("/home");
  const handleLoginNavigation = () => navigate("/login");
  const [location, setLocation] = useState("");

  /*  */

  console.log(user);

  useEffect(() => {
    if (user == false) {
      console.log("not null");
      handleLoginNavigation();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
      } else {
        alert("You have been logged out");
        handleLogoutNavigation();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClick = async () => {
    try {
      const { error } = await supabase

        .from("profiles")

        .update({ location: location })
        .eq("id", user);

      if (error) {
        alert(error.message || error.description);
      } else {
        alert("Your location has been saved");
      }
    } catch (error) {
      alert(error.error_description || error);
    } finally {
      alert("Well done");
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
      <div className=" bg-[#F5F8FF]  flex-col flex items-start pb-40 h-screen">
        <div className="w-[20%] flex flex-col items-center bg-white px-[30px] h-[100vh] fixed">
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
        </div>
      </div>
    </div>
  );
};

export default Account;