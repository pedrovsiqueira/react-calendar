import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import getStore from "./store/getStore";
import reducers from "./reducers";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./hooks/calendarContext";
import { ToastContainer } from "react-toastify";
import "./sass/index.scss";
import "./sass/app.scss";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={getStore(reducers)}>
      <BrowserRouter>
        <ContextProvider>
          <Main />
          <ToastContainer />
        </ContextProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
