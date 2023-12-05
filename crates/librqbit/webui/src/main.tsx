import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RqbitWebUI } from "./rqbit-web";
import { API } from "./http-api";
import { APIContext } from "./components/context";

ReactDOM.createRoot(document.getElementById("app") as HTMLInputElement).render(
  <StrictMode>
    <APIContext.Provider value={API}>
      <RqbitWebUI title="rqbit web UI - version 4.0.0" />
    </APIContext.Provider>
  </StrictMode>
);
