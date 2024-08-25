import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { Container, Typography, Paper, Grid, Box, Button } from "@mui/material";

const AgreementDetail = () => {
  const { id } = useParams();
  const [agreement, setAgreement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/agreements/${id}`)
      .then((response) => setAgreement(response.data))
      .catch((error) =>
        console.error("Error fetching agreement details:", error)
      );
  }, [id]);

  const handleEdit = () => {
    navigate(`/agreements/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/agreements");
  };

  if (!agreement) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Agreement Details
        </Typography>
        <Paper elevation={3} style={{ padding: "24px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Agreement Name
              </Typography>
              <Typography variant="body1">{agreement.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Agreement Amount
              </Typography>
              <Typography variant="body1">${agreement.amount}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Partner
              </Typography>
              <Typography variant="body1">{agreement.partnerName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Start Date
              </Typography>
              <Typography variant="body1">
                {new Date(agreement.startDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                End Date
              </Typography>
              <Typography variant="body1">
                {new Date(agreement.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">{agreement.description}</Typography>
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Agreement
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Back to Agreements
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AgreementDetail;
