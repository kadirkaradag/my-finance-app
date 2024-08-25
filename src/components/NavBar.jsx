import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleLogoutConfirm = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/agreements">
            Agreements
          </Button>
          <Button color="inherit" component={RouterLink} to="/partners">
            Partners
          </Button>
          <Button color="inherit" component={RouterLink} to="/issues">
            Issues
          </Button>
        </Box>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>

      <Dialog open={open} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
