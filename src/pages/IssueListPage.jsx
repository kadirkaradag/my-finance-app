import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => setIssues(response.data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Issues
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <List>
            {issues.map((issue) => (
              <ListItem
                key={issue.id}
                divider
                secondaryAction={
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/issues/${issue.id}`}
                  >
                    View Details
                  </Button>
                }
              >
                <ListItemText
                  primary={issue.title}
                  secondary={`Risk Level: ${
                    issue.riskLevel ? issue.riskLevel : 0
                  }, Cost: $${issue.cost}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueListPage;
