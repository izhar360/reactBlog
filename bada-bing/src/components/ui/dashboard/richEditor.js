import React from "react";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import code from "@editorjs/code";
import list from "@editorjs/list";
// import image from "@editorjs/image";
import quote from "@editorjs/quote";
import raw from "@editorjs/raw";
import embed from "@editorjs/embed";
import SimpleImage from "@editorjs/simple-image";

import Button from "@material-ui/core/Button";

import { createPost } from "../../../api";

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

const Richeditor = (props) => {
  const sumbitArticle = () => {
    editor
      .save()
      .then(async (savedData) => {
        console.log(savedData.blocks);
        try {
          const data = await createPost({ blockContent: savedData.blocks });

          if (data) {
            console.log("data saved in database!", data);
            // history.push("/");
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
    <>
      <div id="editorjs" style={{ width: "80%", height: "auto" }}></div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          style={{ position: "fixed", right: "20px", top: "20px" }}
          onClick={() => sumbitArticle()}
        >
          Post Article
        </Button>
      </div>
    </>
  );
};

export default Richeditor;
