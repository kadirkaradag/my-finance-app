import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { Container, Typography, Paper, Button } from "@mui/material";

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => setIssue(response.data))
      .catch((error) => console.error("Error fetching issue:", error));
  }, [id]);

  const handleDelete = () => {
    ApiService.delete(`/issues/${id}`)
      .then(() => navigate("/issues")) // Silme sonrası liste sayfasına yönlendir
      .catch((error) => console.error("Error deleting issue:", error));
  };

  if (!issue) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          {issue.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {issue.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Risk Level: {issue.riskLevel}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Cost: {issue.cost}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Agreement Amount: {issue.agreementAmount}
        </Typography>
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
          onClick={() => navigate(`/issues/${id}/edit`)} // Düzenleme sayfasına yönlendir
        >
          Edit Issue
        </Button>
      </Paper>
    </Container>
  );
};

export default IssueDetailPage;
