import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Navbar = () => {
  const token = AuthService.getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <nav>
      <h1>Navbar</h1> {/* Test için basit bir metin ekleyin */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/agreements">Agreements</Link>
        </li>
        <li>
          <Link to="/partners">Partners</Link>
        </li>
        <li>
          <Link to="/issues">Issues</Link>
        </li>

        {token ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
