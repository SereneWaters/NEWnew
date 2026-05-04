import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GloProvider } from "./lib/GloContext";

createRoot(document.getElementById("root")!).render(
  <GloProvider>
    <App />
  </GloProvider>
);
