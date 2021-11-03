import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./database/store";
import { Provider } from "react-redux";
import { HMSRoomProvider } from "@100mslive/hms-video-react";
import { isDevMode } from "./utils/general";
import { hmsStore } from "./utils/hms";

if (isDevMode()) {
  store.subscribe(() => {
    console.log("Logging: ", store.getState());
  });
  hmsStore.subscribe(() => {
    console.log("HMS Logging: ", hmsStore.getState());
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HMSRoomProvider store={hmsStore}>
        <App />
      </HMSRoomProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
