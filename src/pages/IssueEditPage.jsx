import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const IssueEditPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    keywords: "",
    cost: "",
    agreementAmount: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => {
        setIssue(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching issue:", error);
        setError("Failed to load issue data.");
        setLoading(false);
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
      .then(() => navigate(`/issues/${id}`))
      .catch((error) => setError("Failed to update issue: " + error.message));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Edit Issue
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={issue.title}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
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
              variant="outlined"
            />
            <TextField
              label="Keywords (comma-separated)"
              name="keywords"
              value={issue.keywords}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px 0" }}
              >
                Update Issue
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueEditPage;
