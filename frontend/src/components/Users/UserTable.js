import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BlogContext from "../../context/Blogs/BlogContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../../context/User/UserContext";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "role", headerName: "Role", width: 200 },
  { field: "email", headerName: "Email", width: 400 },
  
];



export default function DataTable() {
  // const { blogs, getblogs, setSelectedBlog, selectedBlog, getoneblog } = useContext(BlogContext);
  const { getallusers, authors, getuser, setSelectedAuthor } = useContext(UserContext);

  
  useEffect(() => {
    getallusers();
  }, []);


  const rows = authors.map((item) => {
    return { id: item._id, name: item.name, role: item.role, email: item.email };
  });

  const Authorselected = async()=>{
     const data = await getuser();
     setSelectedAuthor(data);
  }


  return (
    <div style={{ height: 600, width: "100%" }}>
      Hello how are you
      <DataGrid rows={rows} columns={columns} pageSize={100}  onRowClick={Authorselected}/>
    </div>
  );
}
