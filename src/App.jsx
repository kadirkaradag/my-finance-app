import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgreementsPage from "./pages/AgreementsPage";
import PartnersPage from "./pages/PartnersPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/NavBar/NavBar"; // Navbar bileşenini eklediğinizden emin olun
import IssueListPage from "./pages/IssueListPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import CreateIssuePage from "./pages/CreateIssuePage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agreements" element={<AgreementsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/issues" element={<IssueListPage></IssueListPage>} />
          <Route
            path="/issues/:id"
            element={<IssueDetailPage></IssueDetailPage>}
          />
          <Route
            path="/issues/create"
            element={<CreateIssuePage></CreateIssuePage>}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
