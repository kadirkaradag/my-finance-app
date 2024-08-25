import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AgreementsPage = () => {
  const [agreements, setAgreements] = useState([]);
  console.log("agreements", agreements);
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
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Amount: {agreement.amount}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    Cost: {agreement.cost}
                  </Typography>
                </>
              }
            />
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to={`/agreements/${agreement.id}`} // Doğru URL parametresi
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AgreementsPage;
