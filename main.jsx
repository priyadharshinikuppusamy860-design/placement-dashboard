import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PlacementProvider } from "./context/PlacementContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlacementProvider>
          <App />
        </PlacementProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
