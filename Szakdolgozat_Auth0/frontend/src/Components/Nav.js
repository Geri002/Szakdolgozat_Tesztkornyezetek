import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {

    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

  return (
    <div className="navigation">
      <li>
        <Link to="/dashboard">Profil</Link>
      </li>
      {isAuthenticated ? (
  <button
    onClick={() => {
      logout();
    }}
  >
    Kijelentkezés
  </button>
) : (
  <button
    onClick={() => {
      loginWithPopup();
    }}
  >
    Bejelentkezés
  </button>
)}
    </div>
  );
};
export default Nav;