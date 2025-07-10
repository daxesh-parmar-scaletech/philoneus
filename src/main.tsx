import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n/index";

import { AuthProvider } from "contexts/AuthContext.tsx";
import ErrorHandler from "shared/withErrorHandler/errorHandler.tsx";
import ErrorBoundary from "shared/errorBoundary/errorBoundary.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <AuthProvider>
        <ErrorHandler />
        <ErrorBoundary />
        <App />
      </AuthProvider>
    </Router>
  </I18nextProvider>
);
