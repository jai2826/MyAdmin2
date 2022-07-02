import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Role from "./Roles";
import React, { useContext, useState } from "react";
import UserContext from "../../context/User/UserContext";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const Navigate = useNavigate();
  const { setSnackbar, snackbar } = useContext(UserContext);



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const CreateUser = async (e) => {
      const authToken = localStorage.getItem("token");
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": authToken },
        body: JSON.stringify({ name, email, role, password:"geekcell" }),
      });
      const data = await response.json();
      if (data.success) {
        setSnackbar({ open: true, msg: data.msg, type: "success" });
        Navigate("/users");
      } else {
        setSnackbar({ open: true, msg: data.msg, type: "warning" });
        console.log(data);
      }
  };
  const nameHandle = async (e) => {
    setName(e.target.value);
  };
  const emailHandle = async (e) => {
    setEmail(e.target.value);
  };
  return (
    <Box m={4}>
      <Paper className="p-6 min-h-[80vh]">
        <Box className="flex flex-row items-center justify-between py-8">
          <Typography m={2} variant="h4">
            Create New User
          </Typography>
          <Button onClick={CreateUser} variant="contained" className="h-fit">
            Save
          </Button>
        </Box>
        <Box className="flex justify-between  ">
          <Stack className="w-8/12" spacing={4}>
            <TextField
              sx={{
                width: "40%",
              }}
              id="name"
              label="Name"
              color="admin"
              onChange={nameHandle}
            />
            <TextField
              sx={{
                width: "40%",
              }}
              id="email"
              label="Email"
              color="admin"
              onChange={emailHandle}
            />
          </Stack>
          <Stack className="p-6 w-3/12 border border-black rounded-md">
            <Typography variant="h6" marginX={"auto"}>
              Utilities
            </Typography>
            <Box>
              <Role role={role} setRole={setRole}/>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUser;
