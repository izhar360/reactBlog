import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "./ui/header";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTheme } from "@material-ui/core/styles";
import { postsData, description } from "./data";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import Fade from "react-reveal/Fade";
import { fetchSinglePost } from "../api";
import Commentbox from "../components/comments/CommentBox";
import DesciptionTest from "./descriptionTest";

// const contentful = require("contentful");

/**
 * @author
 * @function SinglePost
 **/

const useStyles = makeStyles((theme) => ({
  singlePostFront: {
    width: "100%",
    color: "white",
  },
  backImg: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    position: "absolute",
    zIndex: -1,
  },
  articleCover: {
    maxWidth: "800px",

    margin: "20px 20% 0px 20%",
    [theme.breakpoints.down("md")]: {
      margin: "30px 20% 0px 10%",
      paddingBottom: "0px",
      width: "80%",
    },
  },
  title: {
    fontSize: "4.6875rem",
    lineHeight: "1.1",
    fontWeight: "800",
    marginBottom: "3%",

    [theme.breakpoints.down("sm")]: {
      fontSize: "42px",
    },
  },
  brief: {
    fontSize: "20px",
    lineHeight: "1.55",
    marginTop: "3%",
  },
  readTime: {
    fontSize: "18px",
  },
  expand: {
    width: "100%",

    textAlign: "center",
  },
  expandIcon: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("md")]: {
      width: "80px",
      height: "80px",
    },
  },
  description: {
    fontFamily: "Caslon,serif",
    width: "56%",
    margin: "0 auto",
    marginTop: "100px",
    color: "#222",
    fontSize: "26px",
    lineHeight: "1.6",
    "& h6": {
      fontSize: "30px",
      fontWeight: "500",
    },
    "& h6::first-letter": {
      fontSize: "125px",
      backgroundColor: "#363f48",
      color: "#fff",
      float: "left",
      padding: "0px 10px",

      marginRight: "10px",
      marginTop: "10px",
      lineHeight: "0.9",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "19px",
      "& h6": {
        fontSize: "22px",
      },
      width: "90%",
    },
    "& a": {
      color: "#1c93c5",
      textDecoration: "none",
      cursor: "pointer",
    },
    "& images": {
      width: "200px",
      height: "200px",
    },
    "& header": {
      textAlign: "center",
      fontSize: "45px",
      color: "#363f48",
    },
    "& span": {
      textAlign: "center",
      display: "block",
      fontSize: "25px",
      paddingTop: "15px",
    },
  },
  cover: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  icon: {
    width: "50px",
    height: "50px",
    padding: "5px",
  },
  socailIcons: {
    position: "fixed",
    bottom: "0px",
    right: "0px",
    backgroundColor: "#58A2C7",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "0px",
      height: "0px",
    },
  },
}));

const SinglePost = (props) => {
  const { id } = useParams();
  const classes = useStyles();
  //const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePosts] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const getpost = async () => {
      try {
        const { data } = await fetchSinglePost(id);
        setSinglePosts(data);
        console.log(data, "singgggle");
      } catch (error) {
        console.log(error);
      }
    };
    getpost();

    console.log(singlePost, "psqqqqqpspsp");
    // setPosts(postsData[id]);
  }, [singlePost]);

  const calculateReadTime = () => {
    if (singlePost !== null) {
      const n = (singlePost.description + "").split(" ").length / 200;

      return Math.ceil(n);
    }
  };

  return (
    <>
      <div className={classes.singlePostFront}>
        <div
          style={{
            backgroundImage: singlePost && `url("${singlePost.selectedFile}")`,
            //`url("${process.env.PUBLIC_URL}/assets/${posts.image}.jpg")`,
          }}
          className={classes.cover}
        >
          <div style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <Header color="#fff" />
            <div className={classes.articleCover}>
              <Fade bottom delay={100}>
                {" "}
                <p className={classes.title}>
                  {singlePost && singlePost.title}
                </p>{" "}
              </Fade>
              <Fade bottom delay={300}>
                <Chip
                  className={classes.chip}
                  label={"test"}
                  variant="outlined"
                  style={{
                    backgroundColor: "#1c93c5",
                    fontSize: "14px",
                    padding: "7px 3px",
                    fontWeight: "bold",
                    color: "#fff",

                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />{" "}
              </Fade>
              <Fade bottom delay={500}>
                <p variant="h6" className={classes.brief}>
                  {singlePost && singlePost.message}
                </p>
              </Fade>
              <Fade bottom delay={600}>
                <p className={classes.readTime}>
                  {calculateReadTime()} minute read{" "}
                </p>
              </Fade>
            </div>
            <Fade bottom delay={1000}>
              <div className={classes.expand}>
                <ExpandMoreIcon className={classes.expandIcon} />
              </div>
            </Fade>
          </div>
        </div>

        {/* discriptionnnn */}

        <DesciptionTest blockContent={singlePost.blockContent} />

        <div style={{ position: "relative" }}>
          <div className={classes.description}>
            {singlePost && singlePost.description}
          </div>
          <div className={classes.socailIcons}>
            <FacebookIcon className={classes.icon} />
            <InstagramIcon className={classes.icon} />
            <TwitterIcon className={classes.icon} />
            <RedditIcon className={classes.icon} />
            <YouTubeIcon className={classes.icon} />
          </div>
        </div>
      </div>

      <Commentbox />
    </>
  );
};

export default SinglePost;
