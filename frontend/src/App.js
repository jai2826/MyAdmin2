import React from "react";
import UserState from "./context/User/UserState";
import Signup from "./components/Authentication/Signup";
import Signin from "./components/Authentication/Signin";
import Blogs from "./components/Blogs/Blogs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    admin: {
      main: "grey[900]",
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserState>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Layout>
            <Routes>
              <Route path="/" element={<Blogs/>} />
              {/* <Route path="/" element={<Signin />} /> */}
            </Routes>
          </Layout>
        </UserState>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
