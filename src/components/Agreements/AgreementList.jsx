import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { Container, Typography, Paper, Button, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const AgreementList = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Agreements
        </Typography>
        <Grid container spacing={3}>
          {agreements.map((agreement) => (
            <Grid item xs={12} sm={6} md={4} key={agreement.id}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6">{agreement.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Partner: {agreement.partnerName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Amount: ${agreement.amount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Cost: ${agreement.cost}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Date:{" "}
                  {new Date(agreement.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Date: {new Date(agreement.endDate).toLocaleDateString()}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/agreements/${agreement.id}`}
                  >
                    View Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AgreementList;
