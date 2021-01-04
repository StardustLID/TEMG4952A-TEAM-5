import React, { useState } from "react";
import { Link } from "react-router-dom";
import ubs_logo from "../assets/ubs_white_logo.png";
import Sidebar from "./Sidebar";
import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";

function Navbar() {
  const [sidebar, setSidebar] = useState(false); // For toggling the temporary side bar
  const [selectedIndex, setSelectedIndex] = useState(0); // Which sidebar item is selected

  const toggleSidebar = () => setSidebar(!sidebar);

  // onClick handler for clicking a sidebar item
  const clickSidebarItem = (index) => {
    toggleSidebar();
    setSelectedIndex(index);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#343839" }}>
        <Toolbar>
          <IconButton aria-label="menu" className="menu-btn" onClick={toggleSidebar}>
            <Icon color="action">menu</Icon>
          </IconButton>
          <Link to="/" className="nav-ubs-logo">
            <img src={ubs_logo} alt="UBS Logo" height="29" width="80" />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={sidebar} onClose={toggleSidebar}>
        <Sidebar
          clickItem={clickSidebarItem} // onClick handler for items
          selected={selectedIndex} // Index of selected item
        />
      </Drawer>
    </>
  );
}

export default Navbar;
