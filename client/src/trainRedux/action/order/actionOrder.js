import axios from "axios";

import { token } from "../../../components/helpers/checkLogin";
import * as actionTypes from "../actionType";

export const fetchOrderData = (orderData) => ({
  type: actionTypes.FETCH_ORDER_DATA,
  payload: orderData,
});
export const fetchCoopareData = (orderData) => ({
  type: actionTypes.FETCH_COOPARE_DATA,
  payload: orderData,
});

export const showCoopareFetch = (id) => {
  console.log(id);
  return (dispatch) => {
    //const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showCoopare/${id}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          // return res.data;
          dispatch(fetchCoopareData(res.data));
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
        });
    } else {
      console.log("ko token");
      // localStorage.removeItem("userToken");
    }
  };
};

export const saveDataOrderFetch = (dataOrder) => {
  //console.log(dataOrder);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          `http://localhost:3456/createdataorder`,
          { dataOrder },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          //return res.data;
          // dispatch(showListOrderFetch());
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
        });
    } else {
      console.log("ko token");
      //  localStorage.removeItem("userToken");
    }
  };
};
export const showListOrderFetch = () => {
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get("http://localhost:3456/showlistorder", {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // return res.data;
          dispatch(fetchOrderData(res.data));
        })
        .catch((error) => {
          // console.log(error);
          // localStorage.clear();
          return false;
        });
    } else {
      console.log("ko token");
      // localStorage.removeItem("userToken");
      return false;
    }
  };
};
