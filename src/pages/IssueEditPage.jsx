import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const IssueEditPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    keywords: "",
    cost: "",
    agreementAmount: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => setIssue(response.data))
      .catch((error) => {
        console.error("Error fetching issue:", error);
        setError("Failed to load issue data.");
      });
  }, [id]);

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ApiService.put(`/issues/${id}`, issue)
      .then(() => navigate(`/issues/${id}`)) // Başarılı güncelleme sonrası Issue detay sayfasına yönlendir
      .catch((error) => setError("Failed to update issue: " + error.message));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Issue
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={issue.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={issue.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Keywords (comma-separated)"
          name="keywords"
          value={issue.keywords}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Cost"
              name="cost"
              value={issue.cost}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Agreement Amount"
              name="agreementAmount"
              value={issue.agreementAmount}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Issue
        </Button>
      </form>
    </Container>
  );
};

export default IssueEditPage;
