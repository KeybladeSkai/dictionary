import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DefProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <DefProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </DefProvider>
);
