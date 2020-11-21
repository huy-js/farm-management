//import * as types from "../actionType";
import axios from "axios";
//import jwt_decode from "jwt-decode";
import { token } from "../../../components/helpers/checkLogin";
import * as actionTypes from "../actionType";
// import * as actions from "../../action/actionAuth";

export const fetchFarmerData = (farmerData) => ({
  type: actionTypes.FETCH_FARMER_DATA,
  payload: farmerData,
});

export const showListFarmerMapsFetch = (id, limit) => {
  //console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showlistfarmer/${id}/${limit}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchFarmerData(res.data));
          dispatch(showListBatch(res.data[0]._id));
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
export const showMoreListFarmerFetch = (id, limit) => {
  //console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showlistfarmer/${id}/${limit}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchFarmerData(res.data));
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

export const fetchBatchList = (dataList) => ({
  type: actionTypes.FETCH_BATCH_LIST,
  payload: dataList,
});

export const showListBatch = (id) => {
  console.log("list batch " + id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showlistbatch/${id}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchBatchList(res.data));
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

export const updateMapBatch = (data) => {
  console.log("update " + data);
  return (dispatch) => {
    const token = localStorage.userToken;
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .put(
          `http://localhost:3456/updatemapbatch`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          dispatch(fetchBatchList(res.data));
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

export const updateBatchCountStump = (data) => {
  console.log("update stumps " + data);
  return (dispatch) => {
    const token = localStorage.userToken;
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .put(
          `http://localhost:3456/updatebatchcountStump`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          dispatch(fetchBatchList(res.data));
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
