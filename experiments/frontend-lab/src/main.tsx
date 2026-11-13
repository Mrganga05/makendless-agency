import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/syne";
import App from "./App";
import "./lab.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
