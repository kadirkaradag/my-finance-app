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
import IssueEditPage from "./pages/IssueEditPage";
import PrivateRoute from "./components/PrivateRoute";
import AgreementEditPage from "./pages/AgreementEditPage";

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
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/agreements"
              element={
                <PrivateRoute>
                  <AgreementsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/agreements/:id"
              element={
                <PrivateRoute>
                  <AgreementDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/partners"
              element={
                <PrivateRoute>
                  <PartnersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/partners/:id"
              element={
                <PrivateRoute>
                  <PartnerDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/issues"
              element={
                <PrivateRoute>
                  <IssueListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/issues/create"
              element={
                <PrivateRoute>
                  <CreateIssuePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/issues/:id"
              element={
                <PrivateRoute>
                  <IssueDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/issues/:id/edit"
              element={
                <PrivateRoute>
                  <IssueEditPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/agreements/edit/:id"
              element={
                <PrivateRoute>
                  <AgreementEditPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
