import { MdHome, MdViewList, MdAttachMoney, MdSettings } from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <MdHome size={24} />,
    cName: "nav-text",
  },
  {
    title: "Companies",
    path: "/companies",
    icon: <MdViewList size={24} />,
    cName: "nav-text",
  },
  {
    title: "Investments",
    path: "/investments",
    icon: <MdAttachMoney size={24} />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <MdSettings size={24} />,
    cName: "nav-text",
  },
];
