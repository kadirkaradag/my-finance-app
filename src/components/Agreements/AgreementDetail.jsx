import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AgreementDetail = () => {
  const { id } = useParams(); // URL'den id parametresini alın
  const [agreement, setAgreement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get(`/agreements/${id}`)
      .then((response) => setAgreement(response.data))
      .catch((error) =>
        console.error("Error fetching agreement details:", error)
      );
  }, [id]);

  if (!agreement) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          {agreement.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Amount: {agreement.amount}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Cost: {agreement.cost}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/agreements")}
        >
          Back to Agreements
        </Button>
      </Paper>
    </Container>
  );
};

export default AgreementDetail;
