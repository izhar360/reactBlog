import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
//import { useDispatch, useSelector } from 'react-redux';
import FileBase from "react-file-base64";

import useStyles from "./style";
//import { createPost, updatePost } from '../../actions/posts';
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import code from "@editorjs/code";
import list from "@editorjs/list";
// import image from "@editorjs/image";
import quote from "@editorjs/quote";
import raw from "@editorjs/raw";
import embed from "@editorjs/embed";
import SimpleImage from "@editorjs/simple-image";
import { createPost } from "../../../api";

const Form = () => {
  const history = useHistory();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  //const dispatch = useDispatch();
  const classes = useStyles();

  // useEffect(() => {
  //   // if (post) setPostData(post);
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = await createPost(postData);

  //   if (data) {
  //     history.push("/");
  //   }
  // };

  //edit config
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
      },
      list: list,
      code: code,
      image: SimpleImage,
      quote: quote,
      embed: embed,
      raw: raw,
    },
  });

  //editor submit
  const sumbitArticle = async () => {
    editor
      .save()
      .then(async (savedData) => {
        console.log("loggggggggg", savedData.blocks);
        try {
          // const data = await createPost({ blockContent: savedData.blocks });
          // setPostData({ ...postData, blockContent: savedData.blocks });

          const obj = {
            ...postData,
            blockContent: savedData.blocks,
          };

          console.log("the obj", obj, "ooooooo");

          const data = await createPost(obj);

          if (data) {
            console.log("data saved in database!", data);
            history.push("/");
          }
        } catch (e) {
          console.log("couldnot save data to DB", e);
        }
      })
      .catch((error) => {
        console.error("Saving error", error);
      });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Post a Blog</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ position: "fixed", right: "20px", top: "15px" }}
            onClick={() => sumbitArticle()}
          >
            Post Article
          </Button>
        </div>
      </form>
      <div
        id="editorjs"
        style={{
          width: "100%",
          height: "auto",
          margin: "30px 0px 10px 10px",
          border: "1px solid #ccc",
        }}
      >
        Descriptions:
      </div>
    </Paper>
  );
};

export default Form;
