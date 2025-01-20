import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const clientId =
  "633981511392-7dk6nfahbqolab2n8jra89fdkgpa933b.apps.googleusercontent.com";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      containerStyle={{
        maxWidth: "375px",
        width: "100%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />
    <GoogleOAuthProvider
      clientId={clientId}
      children={
        <Provider
          store={store}
          children={
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          }
        />
      }
    />
  </React.StrictMode>
);
