import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => {
        setIssue(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching issue details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    ApiService.delete(`/issues/${id}`)
      .then(() => navigate("/issues"))
      .catch((error) => console.error("Error deleting issue:", error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  if (!issue) {
    return <Typography variant="h6">Issue not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            {issue.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {issue.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Typography variant="body2" color="textSecondary">
              <strong>Risk Level:</strong> {issue.riskLevel || "Unknown"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Cost:</strong> ${issue.cost}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Agreement Amount:</strong> ${issue.agreementAmount}
            </Typography>
          </Stack>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/issues/${id}/edit`)}
            >
              Edit Issue
            </Button>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
              Delete Issue
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Issue"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IssueDetailPage;
