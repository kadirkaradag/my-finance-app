import React from "react";
import IssueChart from "../components/IssueChart";
import ProfitChart from "../components/ProfitChart";
import { Container, Typography } from "@mui/material";
import IssueRiskChartByAgreement from "../components/IssueRiskChartByAgreement";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Issue Risk and Profit Analysis
      </Typography>
      <IssueRiskChartByAgreement />
      <IssueChart />
      <ProfitChart />
    </Container>
  );
};

export default HomePage;
