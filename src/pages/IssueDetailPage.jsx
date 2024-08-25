import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../services/ApiService";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => setIssue(response.data))
      .catch((error) => console.error("Error fetching issue details:", error));
  }, [id]);

  if (!issue) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            {issue.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Agreement: {issue.agreementName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Risk Level: {issue.riskLevel}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Cost: ${issue.cost}
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/issues/${id}/edit`}
            >
              Edit Issue
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={`/agreements/${issue.agreementId}`}
              sx={{ ml: 2 }}
            >
              View Agreement
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueDetailPage;
