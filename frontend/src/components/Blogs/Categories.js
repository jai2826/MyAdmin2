import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../../context/Blogs/BlogContext";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Basic", "TechHub", "TechNews", "Launchpad"];

function getStyles(name, categoriesData, theme) {
  return {
    fontWeight: categoriesData.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ setCategories, categories }) {
  const theme = useTheme();

  //This categories state is for this component
  const [categoriesData, setCategoriesData] = useState([]);


  //This will Function when edit category is hit 
  useEffect(() => {
    if (categories.length > 0) {
      setCategoriesData(categories);
    }
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    //This categories state is for this component
    setCategoriesData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    //This categories state is for AddBlog component
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categoriesData}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, categoriesData, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
