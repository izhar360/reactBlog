import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Zoom from "react-reveal/Zoom";
import { PostsContext } from "../Context/blogContext";

/**
 * @author
 * @function Posts
 **/

const useStyles = makeStyles((theme) => ({
  postMain: {
    width: "80%",
    margin: "0px auto",
    textAlign: "center",
  },
  h2: {
    fontSize: "45px",
    marginTop: "0",
    paddingTop: "40px",
  },
  btn: {
    fontSize: "20px",
    active: {
      borderBottom: "3px solid red",
    },
  },
  gridItem: {
    margin: "0 20px",
  },

  root: {
    // maxWidth: 445,
    width: "360px",

    textDecoration: "none",
  },
  media: {
    height: 180,
  },
}));

const Posts = (props) => {
  const { Posts } = React.useContext(PostsContext);

  const classes = useStyles();

  const [error, setError] = useState(null);

  return (
    <div style={{ backgroundColor: "#E6E7E8" }}>
      <div className={classes.postMain}>
        <h2 className={classes.h2}>RECENT ARTICLES</h2>
        <Button
          className={classes.btn}
          style={{ color: "#119326" }}
          color="inherit"
        >
          Recent
        </Button>
        <Button
          className={classes.btn}
          style={{ color: "#CC374A" }}
          color="inherit"
          startIcon={<WhatshotIcon />}
        >
          Hot
        </Button>
        <Button
          className={classes.btn}
          style={{ color: "#3D5E94" }}
          color="inherit"
        >
          All
        </Button>
      </div>

      <Grid container style={{ marginTop: "30px" }} spacing={2}>
        {Posts.map((post) => (
          <Grid
            key={post._id}
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md
          >
            <Zoom>
              <Card
                className={classes.root}
                component={Link}
                to={`posts/${post._id}`}
                key={post.id}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    // image={`${process.env.PUBLIC_URL}/assets/${post.image}.jpg`}
                    image={post.selectedFile}
                    title="imgcard"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {" "}
                      {post.message}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {error}
    </div>
  );
};

export default Posts;
