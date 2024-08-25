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
  Container,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";

const IssueRiskChartByAgreement = () => {
  const [agreements, setAgreements] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [profitFilter, setProfitFilter] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => {
        setAgreements(response.data);
      })
      .catch((error) => console.error("Error fetching agreements:", error));

    ApiService.get("/issues")
      .then((response) => {
        setIssues(response.data);
        const keywords = response.data.flatMap((issue) =>
          issue.keywords.split(",")
        );
        setFilteredKeywords([...new Set(keywords)]);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleAgreementChange = (event) => {
    setSelectedAgreement(event.target.value);
  };

  const handleKeywordChange = (event, value) => {
    setKeywordFilter(value);
  };

  const handleRiskChange = (event) => {
    setRiskFilter(event.target.value);
  };

  const handleProfitChange = (event) => {
    setProfitFilter(event.target.value);
  };

  const calculateProfit = (issue) => issue.agreementAmount - issue.cost;

  // Risk seviyesini uygun bir etiketle gösterme
  const getRiskLevelLabel = (riskLevel) => {
    switch (riskLevel) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "Unknown";
    }
  };

  // Seçilen Agreement, anahtar kelime, risk seviyesi ve karlılığa göre filtreleme
  const filteredIssues = issues
    .filter((issue) => issue.agreementId === selectedAgreement)
    .filter((issue) => !keywordFilter || issue.keywords.includes(keywordFilter))
    .filter(
      (issue) =>
        riskFilter === "" ||
        (issue.riskLevel && issue.riskLevel.toString() === riskFilter)
    )
    .filter(
      (issue) =>
        !profitFilter || calculateProfit(issue) >= parseFloat(profitFilter)
    )
    .map((issue) => ({
      ...issue,
      riskLabel: getRiskLevelLabel(issue.riskLevel),
      profit: calculateProfit(issue),
    }));

  const getRiskLevelColor = (riskLevel) => {
    if (riskLevel === 0) return "#00FF00"; // Düşük risk - Yeşil
    if (riskLevel === 1) return "#FFFF00"; // Orta risk - Sarı
    return "#FF0000"; // Yüksek risk - Kırmızı
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>{data.title}</strong>
          </p>
          <p>Risk Level: {data.riskLabel}</p>
          <p>Cost: ${data.cost}</p>
          <p>Agreement Amount: ${data.agreementAmount}</p>
          <p>Profit: ${data.profit}</p>
        </div>
      );
    }

    return null;
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
          <Autocomplete
            options={filteredKeywords}
            value={keywordFilter}
            onChange={handleKeywordChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Keyword"
                margin="normal"
              />
            )}
            freeSolo
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Filter by Risk Level</InputLabel>
            <Select
              value={riskFilter}
              onChange={handleRiskChange}
              label="Filter by Risk Level"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="0">Low (0)</MenuItem>
              <MenuItem value="1">Medium (1)</MenuItem>
              <MenuItem value="2">High (2)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Minimum Profit"
            fullWidth
            margin="normal"
            value={profitFilter}
            onChange={handleProfitChange}
            type="number"
          />
          {selectedAgreement && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredIssues}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
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
