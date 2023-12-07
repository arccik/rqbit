import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RqbitWebUI } from "./rqbit-web";
import { API } from "./http-api";
import { APIContext } from "./components/context";
import { ThemeProvider } from "@/providers/theme-provider";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLInputElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <APIContext.Provider value={API}>
        <RqbitWebUI title="rqbit web UI - version 4.0.0" />
      </APIContext.Provider>
    </ThemeProvider>
  </StrictMode>
);
