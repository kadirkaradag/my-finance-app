import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { Container, Typography, Paper, Box, Button, Grid } from "@mui/material";

const AgreementDetail = () => {
  const { id } = useParams();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get(`/agreements/${id}`)
      .then((response) => {
        setAgreement(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agreement details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!agreement || !agreement.issues) {
    return <Typography>No issues available for this agreement.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            {agreement.name}
          </Typography>
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
            Start Date: {new Date(agreement.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            End Date: {new Date(agreement.endDate).toLocaleDateString()}
          </Typography>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Issues
            </Typography>
            <Grid container spacing={2}>
              {agreement.issues.map((issue) => (
                <Grid item xs={12} sm={6} key={issue.id}>
                  <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography variant="subtitle1">{issue.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Risk Level: {issue.riskLevel}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Cost: ${issue.cost}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/issues/${issue.id}`}
                    >
                      View Issue
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AgreementDetail;
