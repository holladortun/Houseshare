import React from "react";
import { NavLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { mobileDrawerState } from "../atoms/mobileDrawerAtom";

const SideBarNav = ({ item, Icon, link }) => {
const  closeMobileDrawer = useSetRecoilState(mobileDrawerState);

  return (
    <div>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "flex items-center text-[16px] gap-4 text-white bg-brandblue -mx-4 rounded-md py-3 pl-4 "
            : "flex items-center text-[16px] gap-4 text-black py-3 pl-4 hover:scale-110 transition-all ease-in duration-200"
        }
        end
        onClick={() => closeMobileDrawer(false)}
      >
        <Icon className="text-[20px]" />
        {item}
      </NavLink>
    </div>
  );
};

export default SideBarNav;
