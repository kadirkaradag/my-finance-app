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
} from "@mui/material";

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    ApiService.get("/partners")
      .then((response) => setPartners(response.data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Partners
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <List>
            {partners.map((partner) => (
              <ListItem key={partner.id} divider>
                <ListItemText
                  primary={partner.name}
                  secondary={`Contact Info: ${partner.contactInfo}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default PartnersPage;
