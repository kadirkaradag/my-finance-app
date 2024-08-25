import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const CreateIssuePage = () => {
  const [agreements, setAgreements] = useState([]);
  const [formData, setFormData] = useState({
    agreementId: "",
    title: "",
    description: "",
    keywords: "",
    cost: "",
    agreementAmount: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get("/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ApiService.post("/issues", formData)
      .then(() => navigate("/issues"))
      .catch((error) => setError("Failed to create issue: " + error.message));
  };

  return (
    <div>
      <h2>Create New Issue</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Agreement:</label>
          <select
            name="agreementId"
            value={formData.agreementId}
            onChange={handleChange}
            required
          >
            <option value="">Select Agreement</option>
            {agreements.map((agreement) => (
              <option key={agreement.id} value={agreement.id}>
                {agreement.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Keywords (comma-separated):</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Agreement Amount:</label>
          <input
            type="number"
            name="agreementAmount"
            value={formData.agreementAmount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
};

export default CreateIssuePage;
