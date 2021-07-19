import PostMessage from "../models/postMessage.js";

import PostswithRichEditor from "../models/PostswithRichEditor.js";

export const getposts = async (req, res) => {
  try {
    console.log("*gettting posts...");
    // old post with plain text, PostMessage
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
    console.log("*done gettting posts...!");
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//  for one post, currently getting for  "description test"
export const getpostsbyID = async (req, res) => {
  try {
    console.log("*gettting posts by id...");
    const postMessage = await PostswithRichEditor.findOne({
      _id: "60f29293bd54203900bad6af",
    });
    // 60f26406ccb55a08c8acfe92 60f165544e792f3180d7fb7f 60f2752d63cbdf2adc9ef2be
    // 60f28e500ac73a3834a3857f
    res.status(200).json(postMessage);
    console.log("*done gettting posts by id...!");
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const postMessage = await PostMessage.findById(req.params.id);

    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

// export const getposts = (req, res) => {
//   user.find((error, data) => {
//       if (error) {
//           return next(error)
//       } else {
//           res.json(data)
//       }
//   })
// }

// for richtext only, simple should use thre below one createPost
export const createRichPost = (req, res, next) => {
  PostswithRichEditor.create(req.body, (error, data) => {
    console.log(req.body);
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

export const createPost = (req, res, next) => {
  PostMessage.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log("fom", data);
    }
  });
};
