import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BlogContext from "../../context/Blogs/BlogContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "user", headerName: "UserId", width: 250 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "categories", headerName: "Categories", width: 200 },
  { field: "utility", headerName: "Utility", width: 200, sortable: false },
];

const BACKEND_URL = "http://localhost:5000";

export default function DataTable() {
  const { blogs, getblogs, setSelectedBlog,selectedBlog, getoneblog } = useContext(BlogContext);


  const BlogSelected=async (item)=>{
    const data =await getoneblog(item.id);
    setSelectedBlog(data)
    // console.log(selectedBlog)
  }
  useEffect(() => {
    getblogs();
  }, []);
  

  // console.log(blogs)
  const rows = blogs.map((item) => {
    return { id: item._id, user: item.user, title: item.title, categories: item.categories };
  });

  // const rows = [{ id: 1, user: "Snow", title: "Jon", categories: 35 }];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={100} onRowClick={(item) => BlogSelected(item)} />
    </div>
  );
}
