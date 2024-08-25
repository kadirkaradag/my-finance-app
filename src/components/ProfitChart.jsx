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

const ProfitChart = () => {
  const [issues, setIssues] = useState([]);
  const [numIssues, setNumIssues] = useState(10);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => {
        setIssues(response.data);
        const keywords = response.data.flatMap((issue) =>
          issue.keywords.split(",")
        );
        setFilteredKeywords([...new Set(keywords)]); // Tekrarlanan kelimeleri kaldır
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleNumIssuesChange = (event) => {
    setNumIssues(event.target.value);
  };

  const handleKeywordChange = (event, value) => {
    setKeywordFilter(value);
  };

  const calculateProfit = (issue) => issue.agreementAmount - issue.cost;

  const displayedIssues = issues
    .slice(-numIssues)
    .filter((issue) => !keywordFilter || issue.keywords.includes(keywordFilter))
    .map((issue) => ({
      ...issue,
      profit: calculateProfit(issue),
    }));

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Profit Analysis
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Number of Issues</InputLabel>
            <Select
              value={numIssues}
              onChange={handleNumIssuesChange}
              label="Number of Issues"
            >
              <MenuItem value={10}>Last 10 Issues</MenuItem>
              <MenuItem value={15}>Last 15 Issues</MenuItem>
              <MenuItem value={20}>Last 20 Issues</MenuItem>
              <MenuItem value={issues.length}>All Issues</MenuItem>
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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={displayedIssues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="#8884d8" />
              <Bar dataKey="agreementAmount" fill="#82ca9d" />
              <Bar dataKey="profit" name="Profit" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfitChart;
