import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  LineChart,
  Line,
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

const IssueChart = () => {
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
        setFilteredKeywords([...new Set(keywords)]);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleNumIssuesChange = (event) => {
    setNumIssues(event.target.value);
  };

  const handleKeywordChange = (event, value) => {
    setKeywordFilter(value);
  };

  const displayedIssues = issues
    .slice(-numIssues)
    .filter(
      (issue) => !keywordFilter || issue.keywords.includes(keywordFilter)
    );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Issue Trend Analysis
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
            <LineChart data={displayedIssues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis yAxisId="left" domain={["auto", "auto"]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 3]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="riskLevel"
                stroke="#ff7300"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cost"
                stroke="#82ca9d"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="agreementAmount"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueChart;
