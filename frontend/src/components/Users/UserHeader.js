import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import BlogContext from "../../context/Blogs/BlogContext";
import UserContext from "../../context/User/UserContext";

const BlogHeader = () => {
  const navigate = useNavigate();
  const { selectedBlog, setSelectedBlog, deleteblog, getblogs } = useContext(BlogContext);
  const { setSnackbar } = useContext(UserContext);
  const GotoAddUser = () => {
    navigate("/users/adduser");
  };
  
  

  return (
    <Box className="flex items-center justify-between">
      <Box className="flex items-center space-x-4">
        <Typography variant="h3">Users</Typography>
        <StickyNote2Icon fontSize="large" />
      </Box>
      <Box className="space-x-2">
        <Button onClick={GotoAddUser} variant="contained">
          Add a User
        </Button>
      </Box>
    </Box>
  );
};

export default BlogHeader;
