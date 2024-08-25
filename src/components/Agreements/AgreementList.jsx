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

const AgreementList = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agreements
      </Typography>
      <List>
        {agreements.map((agreement) => (
          <ListItem key={agreement.id}>
            <ListItemText
              primary={agreement.name}
              secondary={`Amount: ${agreement.amount}`}
            />
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/agreements/${agreement.id}`}
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AgreementList;
