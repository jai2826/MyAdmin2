import { Box, Stack } from '@mui/material'
import React from 'react'
import BlogHeader from './BlogHeader'
import BlogTable from './BlogTable'

const Blogs = () => {
  return (
    <Stack m={4} spacing={8}>
      <BlogHeader/>
      <BlogTable />
    </Stack>
  )
}

export default Blogs