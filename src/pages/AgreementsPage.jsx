import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AgreementsPage = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Agreements
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <List>
            {agreements.map((agreement) => (
              <ListItem
                key={agreement.id}
                divider
                secondaryAction={
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/agreements/${agreement.id}`}
                  >
                    View Details
                  </Button>
                }
              >
                <ListItemText
                  primary={agreement.name}
                  secondary={`Amount: $${agreement.amount}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default AgreementsPage;
