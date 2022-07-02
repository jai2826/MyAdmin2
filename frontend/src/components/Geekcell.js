import { Avatar, Badge, Chip, Divider, IconButton, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { deepOrange, deepPurple } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const Geekcell = () => {
  return (
    <div>
      <div className="space-x-4 flex m-6">
        <div className="text-2xl">Avatars</div>
        <div>
          <Avatar src="Geeklogo5.png" />
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        </div>
      </div>
      <Divider />
      <div className="space-x-4 flex m-6">
        <div className="text-2xl">Badges</div>
        <div>
          <Badge badgeContent={8} color="primary">
            <MailIcon color="action" />
          </Badge>
        </div>
      </div>
      <Divider />
      <div className="space-x-4 flex m-6">
        <div className="text-2xl">Chips</div>
        <div>
          <Chip label="Chip Filled" />
          <Chip label="Chip Outlined" variant="outlined" />
        </div>
      </div>
      <Divider />
      <div className="space-x-4 flex m-6">
        <div className="text-2xl">ToolTips</div>
        <div>
          <Tooltip placement="top" title="Delete" open>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Divider />
      <div className="space-x-4 flex m-6">
        <div className="text-2xl">Typographt</div>
        <div>
          <Typography variant="h1" gutterBottom>
            h1. Heading
          </Typography>
          <Typography variant="h2" gutterBottom component="div">
            h2. Heading
          </Typography>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Geekcell;
