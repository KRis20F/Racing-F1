import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./app/App";
import { QueryProvider } from "./app/providers/QueryProvider";
import { defaultCanvasProps } from "./app/config/three.config";
import { Canvas } from "@react-three/fiber";

// Configure global Three.js settings
Object.assign(Canvas, { defaultProps: defaultCanvasProps });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      }>
        <App />
      </Suspense>
    </QueryProvider>
  </StrictMode>
);
