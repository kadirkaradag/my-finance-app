import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { useParams } from "react-router-dom";

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    ApiService.get(`/issues/${id}`)
      .then((response) => setIssue(response.data))
      .catch((error) => console.error("Error fetching issue:", error));
  }, [id]);

  if (!issue) return <p>Loading...</p>;

  return (
    <div>
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <p>Risk Level: {issue.riskLevel}</p>
      <p>Cost: {issue.cost}</p>
      <p>Agreement Amount: {issue.agreementAmount}</p>
    </div>
  );
};

export default IssueDetailPage;
