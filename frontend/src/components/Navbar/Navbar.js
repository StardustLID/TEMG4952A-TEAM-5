import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "./Navbar.css";
import ubs_logo from "../../assets/ubs_white_logo.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" onClick={showSidebar} className="menu-icon navbar-control">
            <MdMenu size={30} />
          </Link>
          <Link to="/" className="navbar-control">
            <img src={ubs_logo} alt="UBS Logo" className="nav-ubs-logo" />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="close-icon navbar-control">
                <MdClose size={30} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
