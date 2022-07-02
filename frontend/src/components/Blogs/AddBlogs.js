import { Box, Paper, Stack, Typography, TextField, Button,Snackbar } from "@mui/material";
import UserContext from './../../context/User/UserContext'
import {useNavigate} from 'react-router-dom'
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillmodules, quillformats } from "./quill";

import Categories from "./Categories";







const AddBlogs = () => {
    const navigate = useNavigate()
    const { setSnackbar,snackbar} = useContext(UserContext)

  
    
    

    //State variables for categories
    const [categories, setCategories] = useState([])
    
    //State variables for Title
    const [title, setTitle] = useState("")
    //Handling title input
    const titleHandle=(e)=>{
        setTitle(e.target.value)
    }
    
    //State variables for Post
    const [post, setPost] = useState("")
    const postHandle=(e)=>{
        setPost(e)
        // console.log(post)
    }


    //Create and save a blog when save button is clicked
    const SaveBlog =async (e)=>{
        const authToken = localStorage.getItem('token')
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/createblog`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": authToken },
        body: JSON.stringify({ title, post, categories }),
      });
      const data = await response.json();
      if (data.success) {
        setSnackbar({ open: true, msg: data.msg, type: "success" });
        navigate('/blogs')
      } else {
        setSnackbar({ open: true, msg: data.msg, type: "warning" });
        console.log(data)
      }
      // alert("User Created")
    };



  return (
    <Box m={4}>
      <Paper className="p-6 min-h-[80vh]">
        <Box className="flex flex-row items-center justify-between py-8">
          <Typography m={2} variant="h4">
            Edit Here
          </Typography>
          <Button onClick={SaveBlog} variant="contained" className="h-fit">
            Save
          </Button>
        </Box>
        <Box className="flex justify-between  ">
          <Stack className="w-8/12" spacing={4}>
            <TextField
              sx={{
                width: "40%",
              }}
              id="title"
              label="Title"
              color="admin"
              value={title}
              onChange={titleHandle}
            />
            <Box>
              <Typography variant="h5" marginY={2}>
                Post
              </Typography>

              <ReactQuill
                onChange={postHandle}
                modules={quillmodules}
                formats={quillformats}
                className={"[&>div:nth-child(2)]:max-h-[800px] [&>div:nth-child(2)]:min-h-[300px]  whitespace-normal  mb-8"}
              />
            </Box>
          </Stack>
          <Stack className="p-6 w-3/12 border border-black rounded-md">
            <Typography variant="h6" marginX={"auto"}>
              Utilities
            </Typography>
            <Box>
              {/* <Categories setCategories={setCategories} /> */}
              <Categories categories={categories} setCategories={setCategories} />
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddBlogs;
