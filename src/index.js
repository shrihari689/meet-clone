import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./database/store";
import { Provider } from "react-redux";
import { HMSRoomProvider } from "@100mslive/hms-video-react";
import { isDevMode } from "./utils/general";

if (isDevMode())
  store.subscribe(() => {
    console.log("Logging: ", store.getState());
  });

ReactDOM.render(
  <React.StrictMode>
    <HMSRoomProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HMSRoomProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
