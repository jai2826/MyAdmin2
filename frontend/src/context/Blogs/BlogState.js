import React, { useState } from "react";
import BlogContext from "./BlogContext";
const BACKEND_URL = "http://localhost:5000";

const BlogState = (props) => {
  //Storing Blogs from getblogs function and supply it to other components
  const [blogs, setBlogs] = useState([]);

  //Selected Blog for Edit and delete operation
  const [selectedBlog, setSelectedBlog] = useState(null);

  //Get Blogs
  const getblogs = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/getblog`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
    });

    const data = await response.json();
    setBlogs(data);
  };
  //To Get one selected Blog
  const getoneblog = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/getoneblog/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
    });

    const data = await response.json();
    return data;
  };
  // console.log(blogs);

  //Crete a BLog
  const addblog = async (title, post, categories) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/createblog`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
      body: JSON.stringify({ title, post, categories }),
    });
    const data2 = await response.json();
    return data2;
  };

  //Delete a Blog
  const deleteblog = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/deleteblog/${id}`, {
      method: "DELETE",
      headers: { "auth-token": localStorage.getItem("token") },
    });
    const data2 = await response.json();
    return data2;
  };

  //Edit a Blog
  const editblog = async (id) => {
    // console.log("Edit" + id);
  };

  // console.log(newblogs);
  return (
    <BlogContext.Provider value={{ blogs, getblogs,getoneblog, addblog, deleteblog, editblog, setSelectedBlog, selectedBlog }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
