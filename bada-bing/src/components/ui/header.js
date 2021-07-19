import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: 0,

    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuIcon: {
    height: "50px",
    width: "50px",
  },
  title: {
    flexGrow: 1,
    fontSize: "46px",
    fontFamily: "Montserrat,sans-serif",
    fontWeight: "bold",
    marginTop: "1rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
    },
  },
  SwipeableDrawer: {
    backgroundColor: "#f1f1f1",
  },
  ListItem: {
    fontSize: "1.3rem",
    textTransform: "capitalize",
    margin: "10px 40px 0px 10px",
  },
}));

const Header = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const routes = [
    { name: "articlesRR", link: "/articles" },
    { name: "Newsletter", link: "/newsletter" },
    { name: "About", link: "/about" },
    { name: "Subscription", link: "/subscription" },
  ];

  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar style={{ color: props.color }}>
          <Typography className={classes.title}>BADA BING</Typography>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>

          <SwipeableDrawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            classes={{ paper: classes.SwipeableDrawer }}
          >
            <List>
              {routes.map((option, i) => (
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  divider
                  button
                  component={Link}
                  to={option.link}
                  key={option.link}
                >
                  <ListItemText className={classes.ListItem} disableTypography>
                    {option.name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
