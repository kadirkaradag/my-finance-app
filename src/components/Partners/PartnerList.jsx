import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    ApiService.get("/partners")
      .then((response) => setPartners(response.data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  return (
    <div>
      <h1>Partners</h1>
      <ul>
        {partners.map((partner) => (
          <li key={partner.id}>{partner.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PartnersPage;
