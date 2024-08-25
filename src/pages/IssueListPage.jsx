import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => setIssues(response.data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Issues
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/issues/create"
      >
        Create New Issue
      </Button>
      <List>
        {issues.map((issue) => (
          <ListItem key={issue.id} component={Link} to={`/issues/${issue.id}`}>
            <ListItemText
              primary={issue.title}
              secondary={`Risk Level: ${issue.riskLevel}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default IssueListPage;
