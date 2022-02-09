import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { reducer } from "./reducers/index";
import { Provider } from "react-redux";
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)) );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
