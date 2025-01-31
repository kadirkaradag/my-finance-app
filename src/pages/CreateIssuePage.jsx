import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

const CreateIssuePage = () => {
  const [agreements, setAgreements] = useState([]);
  const [formData, setFormData] = useState({
    agreementId: "",
    title: "",
    description: "",
    keywords: "",
    cost: "",
    agreementAmount: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ApiService.post("/issues", formData)
      .then(() => navigate("/issues"))
      .catch((error) => setError("Failed to create issue: " + error.message));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Issue
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Agreement"
          name="agreementId"
          value={formData.agreementId}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="">
            <em>Select Agreement</em>
          </MenuItem>
          {agreements.map((agreement) => (
            <MenuItem key={agreement.id} value={agreement.id}>
              {agreement.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
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
          value={formData.keywords}
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
              value={formData.cost}
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
              value={formData.agreementAmount}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Issue
        </Button>
      </form>
    </Container>
  );
};

export default CreateIssuePage;
