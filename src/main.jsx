import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import "./i18n.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <Provider {...{ store }}>
      <Router>
        <App />
      </Router>
    </Provider>
  </I18nextProvider>
);
