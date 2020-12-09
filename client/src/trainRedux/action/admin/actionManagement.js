//import * as types from "../actionType";
import axios from "axios";
//import jwt_decode from "jwt-decode";
import { token } from "../../../components/helpers/checkLogin";
import * as actionTypes from "../actionType";
import { showListOrderFetch } from "../order/actionOrder";
export const fetchListUserData = (ListUserdata) => ({
  type: actionTypes.FETCH_LIST_USER_DATA,
  payload: ListUserdata,
});
export const fetchListCooperaData = (ListCooperaData) => ({
  type: actionTypes.FETCH_LIST_COOPERA_DATA,
  payload: ListCooperaData,
});
export const showListUserFetch = (iduser) => {
  console.log(iduser);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showlistuser/${iduser}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // return res.data;
          dispatch(fetchListUserData(res.data));
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          // return false;
        });
    } else {
      console.log("ko token");
      //  localStorage.removeItem("userToken");
      // return false;
    }
  };
};

export const updateActiveUserFetch = (data) => {
  //console.log(data);
  let id = data.id;
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .put(
          "http://localhost:3456/updateactive",
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          // return res.data;
          dispatch(showListUserFetch(data.iduser));
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
        });
    } else {
      console.log("ko token");
      //localStorage.removeItem("userToken");
    }
  };
};
export const createPwAndSendFetch = (data) => {
  console.log(data);
  // let id = data.id;
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .put(
          "http://localhost:3456/createPwandSendMail",
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          //return res.data;
          dispatch(showListUserFetch(data.iduser));
        })
        .catch((error) => {
          console.log(error);
          //localStorage.clear();
        });
    } else {
      console.log("ko token");
      //localStorage.removeItem("userToken");
    }
  };
};
export const showCooperativeFetch = (iduser) => {
  console.log(iduser);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(datacreate);showCooperativeFetch
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showcooperation/${iduser}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          console.log(res.data.convertDataCoopera);
          dispatch(fetchListCooperaData(res.data.convertDataCoopera));
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
        });
    } else {
      console.log("ko token");
      //localStorage.removeItem("userToken");
    }
  };
};

// qr
export const createListQrFetch = (dataQR, iduser) => {
  dataQR.iduser = iduser;
  console.log(dataQR);
  return (dispatch) => {
    // const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          "http://localhost:3456/createlistqr",
          { dataQR },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          //  return res.data;
          dispatch(showListOrderFetch());
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
        });
    } else {
      console.log("ko token");
      //localStorage.removeItem("userToken");
    }
  };
};
