import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LevelApp from "./LevelApp";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <LevelApp />
  </StrictMode>
);
