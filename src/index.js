import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./database/store";
import { Provider } from "react-redux";
import { isDevMode } from "./utils/general";
import { hmsStore } from "./utils/hms";
import { setCallInfo } from "./database/call";

if (isDevMode()) {
  store.subscribe(() => {
    console.log("Logging: ", store.getState());
  });
  hmsStore.subscribe(() => {
    const { room, tracks, peers, messages } = hmsStore.getState();
    store.dispatch(setCallInfo({ room, tracks, peers, messages }));
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
