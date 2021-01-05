import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { sidebarData } from "./sidebarData";

// The sidebar menu component (Used in Navbar.js)
const Sidebar = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 250,
      marginTop: 30,
    },
    listItem: {
      color: "white",
      "&$selected": {
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: "rgba(148, 26, 26, 0.3)",
        },
      },
      "&:hover": {
        backgroundColor: "rgba(148, 26, 26, 0.3)",
      },
    },
    listItemIcon: {
      color: "white",
    },
    selected: {},
  }));
  const classes = useStyles(props);

  return (
    <List className={classes.root}>
      {sidebarData.map((item, index) => (
        <ListItem
          key={item.title}
          component={Link} // Use React router's <Link /> for the root
          to={item.path} // Prop used by <Link />
          button
          onClick={() => props.clickItem(index)}
          selected={index === props.selected}
          classes={{ root: classes.listItem, selected: classes.selected }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
