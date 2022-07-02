import React from "react";
import UserState from "./context/User/UserState";
import Signup from "./components/Authentication/Signup";
import Signin from "./components/Authentication/Signin";
import Blogs from "./components/Blogs/Blogs";
import Users from "./components/Users/Users";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddBlogs from "./components/Blogs/AddBlogs";
import BlogState from "./context/Blogs/BlogState";
import EditBlog from "./components/Blogs/EditBlog";
import Geekcell from "./components/Geekcell";
import AddUser from "./components/Users/AddUser";


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
          <BlogState>
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Layout />}>
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/addblogs" element={<AddBlogs />} />
                <Route path="blogs/editblogs" element={<EditBlog />} />
                <Route path="users" element={<Users />} />
                <Route path="users/adduser" element={<AddUser />} />
              </Route>
            </Routes>
          </BlogState>
        </UserState>
      </ThemeProvider>
    </BrowserRouter>
    // <Geekcell/>
  );
};

export default App;
