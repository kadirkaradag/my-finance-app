import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";

const AgreementsPage = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  return (
    <div>
      <h1>Agreements</h1>
      <ul>
        {agreements.map((agreement) => (
          <li key={agreement.id}>{agreement.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AgreementsPage;
