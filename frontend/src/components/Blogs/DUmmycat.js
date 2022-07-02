import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";

const Cat2 = ({ categories, setCategories }) => {
  const [valv, setValv] = useState('Basic')
  const [cat, setCat] = useState([]);
  const handleChange = (e) => {
    setValv(e.target.value)
    setCat([...cat,e.target.value]);
  };
  const [basic, setBasic] = useState(false)
  const [tech, settech] = useState(false)
  const [launch, setlaunch] = useState(false)
  const disable = (e)=>{
    const {name}=e.target;
    if(name === 'basic')
    setBasic(true)
    if(name === 'tech')
    settech(true)
    if(name === 'launch')
    setlaunch(true)
  }
  

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={valv} label="Category" onChange={handleChange}>
          <MenuItem onClick={disable} name={'basic'} disabled={basic} value={"Basic"}>
            Basic
          </MenuItem>
          <MenuItem onClick={disable} name={'tech'} disabled={tech} value={"Tech"}>
            Tech
          </MenuItem>
          <MenuItem onClick={disable} name={'launch'} disabled={launch} value={"Launch"}>
            Launch
          </MenuItem>
        </Select>
      </FormControl>

      <List className="max-w-fit !mx-auto ">
        {cat.map((item) => {
          return (
            <ListItem key={item} className="bg-red-400 max-w-fit ">
              <ListItemText primary={`${item}`} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Cat2;
