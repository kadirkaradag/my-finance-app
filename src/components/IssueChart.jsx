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
} from "@mui/material";

const IssueChart = () => {
  const [issues, setIssues] = useState([]);
  const [numIssues, setNumIssues] = useState(10);

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleNumIssuesChange = (event) => {
    setNumIssues(event.target.value);
  };

  const displayedIssues = issues.slice(-numIssues);

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
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={displayedIssues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="riskLevel"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="cost" stroke="#82ca9d" />
              <Line
                type="monotone"
                dataKey="agreementAmount"
                stroke="#ffc658"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default IssueChart;
