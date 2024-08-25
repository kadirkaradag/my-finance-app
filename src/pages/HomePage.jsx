import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Application
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the homepage. Use the navigation to explore different sections.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/issues">
        View Issues
      </Button>
    </Container>
  );
};

export default HomePage;
