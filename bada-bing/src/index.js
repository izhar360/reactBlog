import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { PostsContextProvider } from "./components/Context/blogContext";

ReactDOM.render(
  <PostsContextProvider>
    <App />
  </PostsContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
