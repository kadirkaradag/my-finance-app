import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PartnerDetail = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/partners/${id}`)
      .then((response) => setPartner(response.data))
      .catch((error) =>
        console.error("Error fetching partner details:", error)
      );
  }, [id]);

  if (!partner) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          {partner.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Contact Info: {partner.contactInfo}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/partners")}
        >
          Back to Partners
        </Button>
      </Paper>
    </Container>
  );
};

export default PartnerDetail;
