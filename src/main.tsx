import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./utils/redux/store/store";
import "./styles/index.css";
import App from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
