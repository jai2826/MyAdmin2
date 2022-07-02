import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../context/User/UserContext";
import Navbar from "./Navbar";

const Layout = (props) => {
  const navigate = useNavigate();
  const { loggedin, setLoggedin } = useContext(UserContext);
  const authToken = localStorage.getItem("token");
  // console.log(loggedin)
  useEffect(() => {
    if (!authToken) {
      setLoggedin(false);
      navigate("/signin", { replace: true });
    } else if (authToken) {
      setLoggedin(true);
    }
  }, []);

  return (
    <>
      <Box className="flex">
        <Navbar />
        <Box className="w-full mt-16 ">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
