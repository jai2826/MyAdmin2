import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { Box, Button, Paper, TextField, Typography, FormControl, InputAdornment, IconButton, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const BACKEND_URL = "http://localhost:5000";

const SnackAlert = forwardRef(function SnackAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const App = () => {
  //Get the value of input fields
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const CredsHandle = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    // console.table(Credentials);
  };

  //SnackBar Functioning
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    type: "warning",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ open: false, type: snackbar.type });
  };

  //Create user on Click Signin
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = Credentials;
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.success) {
      setSnackbar({ open: true, msg: data.msg, type: "success" });
      localStorage.setItem("token", data.authtoken);
    } else {
      setSnackbar({ open: true, msg: data.msg, type: "warning" });
    }
  };

  //Navigate user to signin page
  const navigate = useNavigate();
  const gotoSignup = () => {
    navigate("/signup");
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
        <Box marginX={"auto"} className={"w-fit"}>
          <FormControl>
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

            <Button onClick={loginUser} variant="contained" sx={{ marginX: "auto", marginTop: "4px" }}>
              Sign In
            </Button>
            <Snackbar
              autoHideDuration={4000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackbar.open}
              onClose={handleClose}
            >
              <SnackAlert onClose={handleClose} variant="filled" severity={`${snackbar.type}`}>
                {snackbar.msg}
              </SnackAlert>
            </Snackbar>
            <Box className="flex flex-row items-center my-4 justify-between">
              <Typography variant="subtitle1">Create a new Account</Typography>
              <Button onClick={gotoSignup} variant="text" sx={{ alignItems: "end", padding: "0" }} size={"small"}>
                Sign Up
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
