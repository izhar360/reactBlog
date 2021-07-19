import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  message: String,
  blockContent: [],
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [String],
    default: null,
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
