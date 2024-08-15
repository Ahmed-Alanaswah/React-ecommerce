import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";

import { store, persistore } from "@store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./services/axios-global.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
