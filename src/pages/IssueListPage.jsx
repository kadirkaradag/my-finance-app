import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => setIssues(response.data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Issues
        </Typography>
        <Grid container spacing={3}>
          {issues.map((issue) => (
            <Grid item xs={12} sm={6} md={4} key={issue.id}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6">{issue.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Agreement: {issue.agreementName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Risk Level: {issue.riskLevel}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Cost: ${issue.cost}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/issues/${issue.id}`}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default IssueListPage;
