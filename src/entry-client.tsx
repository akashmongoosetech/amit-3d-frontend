import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

function App() {
  return (
    <StrictMode>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
