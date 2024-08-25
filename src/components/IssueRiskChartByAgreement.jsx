import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const IssueRiskChartByAgreement = () => {
  const [agreements, setAgreements] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState("");

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => {
        setAgreements(response.data);
      })
      .catch((error) => console.error("Error fetching agreements:", error));

    ApiService.get("/issues")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleAgreementChange = (event) => {
    setSelectedAgreement(event.target.value);
  };

  const filteredIssues = issues.filter(
    (issue) => issue.agreementId === selectedAgreement
  );

  const getRiskLevelColor = (riskLevel) => {
    if (riskLevel === 0) return "#00FF00"; // Düşük risk - Yeşil
    if (riskLevel === 1) return "#FFFF00"; // Orta risk - Sarı
    return "#FF0000"; // Yüksek risk - Kırmızı
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Issue Risk Analysis by Agreement
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Agreement</InputLabel>
            <Select
              value={selectedAgreement}
              onChange={handleAgreementChange}
              label="Select Agreement"
            >
              {agreements.map((agreement) => (
                <MenuItem key={agreement.id} value={agreement.id}>
                  {agreement.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedAgreement && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredIssues}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="riskLevel">
                  {filteredIssues.map((issue, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getRiskLevelColor(issue.riskLevel)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueRiskChartByAgreement;
