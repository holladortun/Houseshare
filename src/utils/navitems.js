import {
  RiHome4Fill,
  RiHome4Line,
  RiChat1Fill,
  RiBuilding2Fill,
  RiSettingsFill,
  RiQuestionnaireFill,
} from "react-icons/ri";
import {HiUsers} from "react-icons/hi"
import {MdNotificationsActive} from "react-icons/md"





const navitems = [
  {
    item: "Dashboard",
    Icon: RiHome4Fill,
    link: "/account/dashboard",
  },
  /* {
    item: "Properties",
    Icon: RiBuilding2Fill,
    link: "/account/properties",
  }, */
  {
    item: "My Listings",
    Icon: RiHome4Fill,
    link: "/account/mylistings",
  },
  {
    item: "Notifications",
    Icon: MdNotificationsActive,
    link: "/account/notifications",
  },
  {
    item: "Membership",
    Icon: HiUsers,
    link: "/account/memberships",
  },
  {
    item: "Chat",
    Icon: RiChat1Fill,
    link: "/account/chat",
  },
];


export const preferences = [
  {
    item: "Settings",
    Icon: RiSettingsFill,
    link: "/account/settings",
  },
  {
    item: "FAQs & Help",
    Icon: RiQuestionnaireFill,
    link: "/account/faqs",
  },
];

export default navitems;
