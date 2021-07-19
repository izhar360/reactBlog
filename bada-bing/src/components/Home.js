import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import HomeIntro from "./ui/homeIntro";
import HomeEvents from "./ui/homeEvents";
import Header from "./ui/header";
//import PostsRich from "./ui/postsRich";
import Posts from "./ui/posts";

/**
 * @author
 * @function Home
 **/

const useStyles = makeStyles((theme) => ({}));

const Home = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Header color="#333" />
      <HomeIntro />
      <HomeEvents />
      <Posts />
    </div>
  );
};

export default Home;
