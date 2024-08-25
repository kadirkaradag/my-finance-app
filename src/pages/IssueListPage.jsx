import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Issue'ların listesini getir
    ApiService.get("/issues")
      .then((response) => setIssues(response.data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  return (
    <div>
      <h2>Issues</h2>
      <Link to="/issues/create">Create New Issue</Link>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
            <p>Risk Level: {issue.riskLevel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueListPage;
