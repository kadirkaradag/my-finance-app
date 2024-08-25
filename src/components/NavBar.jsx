import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // AuthService'i içe aktarın

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated(); // Kullanıcı oturumunu kontrol edin

  const handleLogout = () => {
    AuthService.logout(); // Oturumu kapat
    navigate("/login"); // Login sayfasına yönlendir
  };

  return (
    <AppBar position="static">
      <Toolbar>
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
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
