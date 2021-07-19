import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { fetchposts } from "../api";

const useStyles = makeStyles((theme) => ({
  desc: {
    fontFamily: "Caslon,serif",
    color: "#222",
    fontSize: "26px",
    lineHeight: "1.4",
    maxWidth: "80%",
    height: "auto",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "700px",
      height: "auto",
    },
    "& h1,h2,h3,h4": {
      textAlign: "center",
      fontSize: "45px",
      color: "#363f48",
      textTransform: "capitalize",
    },
  },
}));

const DesciptionTest = ({ blockContent }) => {
  const classes = useStyles();
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    // const getpost = async () => {
    //   try {
    //     const { data } = await fetchposts();
    //     setSinglePost(data);
    //     console.log(data, "from data");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getpost();
    // console.log(singlePost, "from singlePost");
  }, []);

  return (
    <div className={classes.desc}>
      {blockContent &&
        blockContent.map((el) => {
          if (el.type == "header") {
            if (el.data.level === 1) {
              return <h1>{el.data.text}</h1>;
            } else if (el.data.level === 2) {
              return <h2>{el.data.text}</h2>;
            } else if (el.data.level === 3) {
              return <h3>{el.data.text}</h3>;
            } else if (el.data.level === 4) {
              return <h4>{el.data.text}</h4>;
            }
          } else if (el.type == "paragraph") {
            return <p>{el.data.text}</p>;
          } else if (el.type == "list") {
            if (el.data.style === "ordered") {
              return (
                <ol>
                  {el.data.items.map((el) => (
                    <li>{el}</li>
                  ))}
                </ol>
              );
            } else if (el.data.style === "unordered") {
              return (
                <ul>
                  {el.data.items.map((el) => (
                    <li>{el}</li>
                  ))}
                </ul>
              );
            }
          } else if (el.type == "image") {
            return <img src={el.data.url} />;
          } //else if (el.type == "code") {
          //   return (
          //     <code>
          //       <p>{el.data}</p>
          //     </code>
          //   );
          // }
        })}
    </div>
  );
};

export default DesciptionTest;
