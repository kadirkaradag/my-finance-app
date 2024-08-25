import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const PartnerList = () => {
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
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/partners/${partner.id}`}
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PartnerList;
