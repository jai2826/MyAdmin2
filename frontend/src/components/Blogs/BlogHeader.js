import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import BlogContext from "../../context/Blogs/BlogContext";
import UserContext from "../../context/User/UserContext";

const BlogHeader = () => {
  const navigate = useNavigate();
  const { selectedBlog,setSelectedBlog, deleteblog,  getblogs } = useContext(BlogContext);
  const { setSnackbar } = useContext(UserContext);
  const GotoAddBlog = () => {
    navigate("/blogs/addblogs");
  };
  const DeleteBlog =async () => {
    const data = await deleteblog(selectedBlog._id);
    getblogs();
    setSnackbar({open:true,msg:data.msg,type:"success"})
    setSelectedBlog(null)
  };
  const EditBlog =async () => {
    
    
    navigate("/blogs/editblogs");
  };


  return (
    <Box className="flex items-center justify-between">
      <Box className="flex items-center space-x-4">
        <Typography variant="h3">Blogs</Typography>
        <StickyNote2Icon fontSize="large" />
      </Box>
      <Box className="space-x-2">
        <Button  onClick={GotoAddBlog} variant="contained" >
          Add a Blog
        </Button>
        <Button disabled={!selectedBlog}  onClick={EditBlog} variant="contained" >
          Edit 
        </Button>
        <Button disabled={!selectedBlog}  onClick={DeleteBlog} variant="contained" >
          Delete 
        </Button>
      </Box>
    </Box>
  );
};

export default BlogHeader;
