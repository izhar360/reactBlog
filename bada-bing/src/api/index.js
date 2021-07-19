import axios from "axios";

const URL = "http://localhost:5000/posts";
const COMMENTS_URL = "http://localhost:5000/comments";

export const fetchposts = () => axios.get(URL);

export const fetchSinglePost = (id) => axios.get(`${URL}/${id}`);

export const createPost = (newPost) => axios.post(URL, newPost);

export const fetchComments = () => axios.get(`${COMMENTS_URL}/comments`);

export const submitCommentApi = (newcomment) =>
  axios.post(`${COMMENTS_URL}/comments`, newcomment);

export const updateComment = ({ updateId, author, text }) =>
  axios.put(`${COMMENTS_URL}/comments/${updateId}`, { author, text });

export const deleteComment = (updateId) =>
  axios.delete(`${COMMENTS_URL}/comments/${updateId}`);

//   fetch(`api/comments/${id}`, { method: "DELETE" })
//   .then((res) => res.json())
//   .then((res) => {
//     if (!res.success) this.setState({ error: res.error });
//   });

// fetch(`/api/comments/${updateId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ author, text }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (!res.success)
//         this.setState({ error: res.error.message || res.error });
//       else this.setState({ author: "", text: "", updateId: null });
//     });
