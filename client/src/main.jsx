import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

// Retrieve the token from local storage
const token = localStorage.getItem("token");

// Set the authorization header for subsequent requests
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
