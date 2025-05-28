import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./store.js";
import App from "./App.jsx";

import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
        <Toaster />
      </StyledEngineProvider>
    </StrictMode>
  </Provider>
);
