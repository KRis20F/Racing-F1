import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import Routes from "./routes";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
