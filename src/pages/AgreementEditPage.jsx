import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import ApiService from "../services/ApiService";

const AgreementEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState({
    name: "",
    amount: 0,
    cost: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Anlaşma detaylarını yüklemek için API isteği
    ApiService.get(`/agreements/${id}`)
      .then((response) => {
        setAgreement(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the agreement!", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgreement({ ...agreement, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Anlaşma düzenlemesi için API isteği
    ApiService.put(`/agreements/${id}`, agreement)
      .then(() => {
        navigate("/agreements");
      })
      .catch((error) => {
        console.error("There was an error updating the agreement!", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Agreement
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={agreement.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={agreement.amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cost"
          name="cost"
          type="number"
          value={agreement.cost}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={agreement.startDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={agreement.endDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default AgreementEditPage;
