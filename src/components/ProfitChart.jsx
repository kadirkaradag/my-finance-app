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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"; // Doğru kütüphaneden içe aktarım

const ProfitChart = () => {
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

  const displayedIssues = issues.slice(-numIssues);

  const calculateProfit = (issue) => issue.agreementAmount - issue.cost;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profit Analysis
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
        <BarChart data={displayedIssues}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" />
          <Bar dataKey="agreementAmount" fill="#82ca9d" />
          <Bar dataKey={calculateProfit} name="Profit" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default ProfitChart;
