//import * as types from "../actionType";
import axios from "axios";
//import jwt_decode from "jwt-decode";

export const userCreateFarmerFetch = (datacreate) => {
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          "http://localhost:3456/createfarmer",
          {
            datacreate: datacreate,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
        });
    } else {
      console.log("ko token");
      localStorage.removeItem("userToken");
      return false;
    }
  };
};

export const showFarmerFetch = (datacreate) => {
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get("http://localhost:3456/showfarmer", {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
        });
    } else {
      console.log("ko token");
      localStorage.removeItem("userToken");
    }
  };
};
// admin
export const userCreateCooperationFetch = (datacreate) => {
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          "http://localhost:3456/createcooperation",
          {
            datacreate: datacreate,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
        });
    } else {
      console.log("ko token");
      localStorage.removeItem("userToken");
      return false;
    }
  };
};
export const showCooperationFetch = (datacreate) => {
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get("http://localhost:3456/showcooperation", {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
        });
    } else {
      console.log("ko token");
      localStorage.removeItem("userToken");
    }
  };
};
