import { useState } from "react";
import { Link } from "react-router-dom";
import ubs_logo from "../assets/ubs_white_logo.png";
import Sidebar from "./Sidebar";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#343839",
  },
  menuBtn: {
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // Uses the value in muiTheme.js
    },
  },
  ubsLogoBtn: {
    display: "flex",
    alignItems: "center",
    marginLeft: 45,
    "&:hover": {
      opacity: 0.8,
      transition: "0.1s",
    },
  },
  sidebarPaper: {
    backgroundColor: "#343839",
  },
}));

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false); // For toggling the temporary side bar
  const [selectedIndex, setSelectedIndex] = useState(0); // Which sidebar item is selected

  const toggleSidebar = () => setSidebar(!sidebar);

  // onClick handler for clicking a sidebar item
  const clickSidebarItem = (index) => {
    toggleSidebar();
    setSelectedIndex(index);
  };

  const classes = useStyles(props);

  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <IconButton aria-label="menu" className={classes.menuBtn} onClick={toggleSidebar}>
            <Icon>menu</Icon>
          </IconButton>
          <Link to="/" className={classes.ubsLogoBtn}>
            <img src={ubs_logo} alt="UBS Logo" height="29" width="80" />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left" // Open from left side
        open={sidebar} // Open if true
        onClose={toggleSidebar} // Callback fired when sidebar is closed
        classes={{ paper: classes.sidebarPaper }} // Style the sidebar's background
      >
        <Sidebar
          clickItem={clickSidebarItem} // onClick handler for items
          selected={selectedIndex} // Index of selected item
        />
      </Drawer>
    </>
  );
};

export default Navbar;
