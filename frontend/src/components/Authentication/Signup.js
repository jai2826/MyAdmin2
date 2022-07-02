import React, { useState,  useContext } from "react";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { Box, Button, Paper, TextField, Typography, InputAdornment, IconButton, Snackbar } from "@mui/material";
import UserContext from "../../context/User/UserContext";


const App = () => {
  const { loggedin, setLoggedin, setSnackbar, snackbar } = useContext(UserContext);

  //Get the value of input fields
  const [Credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const CredsHandle = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    // console.table(Credentials);
  };

  //Create a user on Click Signin
  const createUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = Credentials;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    //To print console.log properly
    // console.log(JSON.stringify(data, null, " "));

    if (data.success) {
      setSnackbar({ open: true, msg: data.msg, type: "success" });
      localStorage.setItem("token", data.authtoken);
      setLoggedin(true);
      navigate("/blogs", { replace: true });
    } else {
      setSnackbar({ open: true, msg: data.msg, type: "warning" });
    }
  };

  //Navigate user to signin page
  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin",{replace:loggedin});
  };

  //Password Visibility toggle
  const [passVisible, setPassVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const showPassword = () => {
    setPassVisible(!passVisible);
    if (passVisible) setPassType("password");
    else setPassType("text");
  };

  return (
    <Box className="mx-auto container  ">
      <Paper className="my-10 p-10 bg-gradient-to-r from-[#FFECD2]  to-[#FCB69F]">
        <Typography variant="h4" align="center" p={5}>
          Sign Up
        </Typography>
        <Box marginX={"auto"} className={"w-fit bg"}>
          <FormControl>
            <TextField
              onChange={CredsHandle}
              name="name"
              value={Credentials.name}
              type="text"
              margin="normal"
              aria-label="name"
              label={"name"}
              color="admin"
              className={"w-96"}
            />
            <TextField
              onChange={CredsHandle}
              name="email"
              value={Credentials.email}
              type="email"
              margin="normal"
              aria-label="email"
              label={"email"}
              color="admin"
              className={"w-96"}
            />
            <TextField
              onChange={CredsHandle}
              name="password"
              value={Credentials.password}
              type={`${passType}`}
              margin="normal"
              aria-label="password"
              label={"password"}
              color="admin"
              className={"w-96"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end" onClick={showPassword}>
                      {passVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button onClick={createUser} variant="contained" sx={{ marginX: "auto", marginTop: "4px" }}>
              Sign Up
            </Button>

            <Box className="flex flex-row items-center my-4 justify-between">
              <Typography variant="subtitle1">Already have an account</Typography>
              <Button onClick={gotoSignin} variant="text" sx={{ alignItems: "end", padding: "0" }} size={"small"}>
                Sign IN
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
