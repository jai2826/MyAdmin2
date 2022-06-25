import { Box } from '@mui/material';
import React from 'react'
import Navbar from './Navbar'

const Layout = (props) => {
  return (
    <Box className="flex">
      <Navbar />
      <Box className='w-full mt-16 '>{props.children}</Box>
    </Box>
  );
}

export default Layout