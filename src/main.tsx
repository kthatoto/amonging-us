import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import "@/styles/index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
);
