import React, { forwardRef, useState } from 'react'
import UserContext from './UserContext'
import MuiAlert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

const UserState = (props) => {
    const [loggedin, setLoggedin] = useState(false)
    const [authors,setAuthors]=useState([])
    const [selectedAuthor,setSelectedAuthor]=useState(null)

  //snackbar Functioning for User Login and Sign up
  const SnackAlert = forwardRef(function SnackAlert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
  });
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

  const getallusers = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getallusers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
    });

    const data = await response.json();

    setAuthors(data);
    console.log(authors)
  };
  const getuser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
    });

    const data = await response.json();

    setSelectedAuthor(data);
    console.log(authors)
  };





  return (
    <UserContext.Provider value={{ loggedin, setLoggedin, setSnackbar, getallusers, authors,getuser, setSelectedAuthor }}>
      {props.children}
      <Snackbar autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} open={snackbar.open} onClose={handleClose}>
        <SnackAlert onClose={handleClose} variant="filled" severity={`${snackbar.type}`}>
          {snackbar.msg}
        </SnackAlert>
      </Snackbar>
    </UserContext.Provider>
  );
}

export default UserState