// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import "../navbar/navbar.css"


// Here, we display our Navbar


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className="navbar_container ">
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <NavLink
              className="nav-link" to="/">
              Dashboard
            </NavLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <NavLink
              className="nav-link" to="/create">
              Create Record
            </NavLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink className="nav-link" to="/records">
              Record List
            </NavLink>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
