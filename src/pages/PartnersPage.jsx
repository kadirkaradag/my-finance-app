import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
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
      <Typography variant="h4" gutterBottom>
        Partners
      </Typography>
      <List>
        {partners.map((partner) => (
          <ListItem key={partner.id}>
            <ListItemText
              primary={partner.name}
              secondary={`Contact Info: ${partner.contactInfo}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PartnersPage;
