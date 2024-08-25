import React from "react";
import IssueChart from "../components/IssueChart";
import ProfitChart from "../components/ProfitChart";
import { Container } from "@mui/material";
import IssueRiskChartByAgreement from "../components/IssueRiskChartByAgreement";

const HomePage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <IssueRiskChartByAgreement />
      <IssueChart />
      <ProfitChart />
    </Container>
  );
};

export default HomePage;
