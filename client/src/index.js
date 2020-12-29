import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./trainRedux/reducers/authReducer";
import fmManagerReducer from "./trainRedux/reducers/fmManagerReducer";
import orderReducer from "./trainRedux/reducers/orderReducer";
import userReducer from "./trainRedux/reducers/userReducer";
import diaryReducer from "./trainRedux/reducers/diaryReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer: authReducer,
  fmManagerReducer: fmManagerReducer,
  orderReducer: orderReducer,
  userReducer: userReducer,
  diaryReducer: diaryReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
