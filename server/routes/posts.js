import express from "express";
import {
  getposts,
  createPost,
  getSinglePost,
  createRichPost,
  getpostsbyID,
} from "../controller/posts.js";
import { protect } from "./../controller/authController.js";

const router = express.Router();
//protect ===> before getposts

//post: use createPost for simple text, createRichPost for richtext
//get: use getposts for all, getpostsbyID for one by id
router.route("/").get(getposts).post(createPost);
//router.get("/", getposts);
//router.post("/", createPost);
router.route("/:id").get(getSinglePost);
//router.get("/:id", getSinglePost);
// router.route("/").post((req, res, next) => {
//   console.log("======", req.body, "=d========");
//   PostMessage.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

export default router;
