import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { Container, Typography, Paper, Button, Box } from "@mui/material";

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => setIssue(response.data))
      .catch((error) => console.error("Error fetching issue details:", error));
  }, [id]);

  const handleDelete = () => {
    ApiService.delete(`/issues/${id}`)
      .then(() => navigate("/issues"))
      .catch((error) => console.error("Error deleting issue:", error));
  };

  if (!issue) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h4" gutterBottom>
            {issue.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {issue.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Risk Level: {issue.riskLevel ? issue.riskLevel : 0}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Cost: ${issue.cost}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Agreement Amount: ${issue.agreementAmount}
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              style={{ marginRight: "8px" }}
            >
              Delete Issue
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/issues/${id}/edit`)}
            >
              Edit Issue
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueDetailPage;
