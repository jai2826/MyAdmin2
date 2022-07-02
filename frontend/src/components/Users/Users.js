import { Box, Stack } from "@mui/material";
import React from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";



const Blogs = () => {
  return (
    <Stack m={4} spacing={8}>
      <UserHeader />
      <UserTable/>
    </Stack>
  );
};

export default Blogs;
