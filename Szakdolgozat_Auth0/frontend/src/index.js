import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./Dashboard";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route
    path="/"
    element={
      <Auth0Provider
        domain="dev-m78x4hwbfc08855e.us.auth0.com"
        clientId="XJ35pnZyhpi0z538eGMeM6mxSr0K7lTK"
        redirect_uri="http://localhost:3000"
      >
        <App />
      </Auth0Provider>
    }
  />
 <Route
    path="dashboard"
    element={
      <Auth0Provider
        domain="dev-m78x4hwbfc08855e.us.auth0.com"
        clientId="XJ35pnZyhpi0z538eGMeM6mxSr0K7lTK"
        redirect_uri="http://localhost:3000"
      >
        <Dashboard />
      </Auth0Provider>
    }
  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);