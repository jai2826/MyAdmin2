import React from 'react'
import Signup from './components/Authentication/Signup'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {grey} from '@mui/material/colors'



const theme = createTheme({
  palette: {
    admin: {
      main: grey[900]
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Signup/>
    </ThemeProvider>
  );
}

export default App
