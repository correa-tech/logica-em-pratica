import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/routes.jsx";
import "./assets/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
