import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgreementsPage from "./pages/AgreementsPage";
import PartnersPage from "./pages/PartnersPage";
import CreateIssuePage from "./pages/CreateIssuePage";
import IssueListPage from "./pages/IssueListPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import AgreementDetail from "./components/Agreements/AgreementDetail";
import PartnerDetail from "./components/Partners/PartnerDetail";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IssueEditPage from "./pages/IssueEditPage"; // IssueEditPage bileşenini içe aktarın

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/agreements" element={<AgreementsPage />} />
            <Route path="/agreements/:id" element={<AgreementDetail />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/partners/:id" element={<PartnerDetail />} />
            <Route path="/issues" element={<IssueListPage />} />
            <Route path="/issues/create" element={<CreateIssuePage />} />
            <Route path="/issues/:id" element={<IssueDetailPage />} />
            <Route path="/issues/:id/edit" element={<IssueEditPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
