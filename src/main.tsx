import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "src/store";
import App from "src/App";
import "src/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
