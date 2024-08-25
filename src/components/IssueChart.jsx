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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";

const IssueChart = () => {
  const [issues, setIssues] = useState([]);
  const [numIssues, setNumIssues] = useState(10); // Varsayılan olarak 10 kayıt gösterelim

  useEffect(() => {
    ApiService.get("/issues")
      .then((response) => {
        setIssues(response.data); // Tüm issue verilerini alıyoruz
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleNumIssuesChange = (event) => {
    setNumIssues(event.target.value);
  };

  // Kullanıcının seçimine göre slice ile sadece belirli sayıda issue göster
  const displayedIssues = issues.slice(-numIssues);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Issue Risk Analysis
      </Typography>
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
          <MenuItem value={issues.length}>All Issues</MenuItem>{" "}
          {/* Tüm issue'ları gösterme seçeneği */}
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
          <Line type="monotone" dataKey="agreementAmount" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default IssueChart;
