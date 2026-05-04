import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GloProvider } from "./context/GloContext"; // adjust path if needed

createRoot(document.getElementById("root")!).render(
  <GloProvider>
    <App />
  </GloProvider>
);
