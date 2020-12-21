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

export const fetchCheckedMap = (data) => ({
  type: actionTypes.FETCH_CHECK_MAP,
  payload: data,
});
// redux data diary
export const changeFarmer = (bl) => ({
  type: actionTypes.FETCH_FARMER_MAP,
  payload: bl,
});
export const changeScreenMap = (bl) => {
  return (dispatch) => {
    dispatch(changeFarmer(bl));
  };
};
export const fetchDataDiary = (data) => ({
  type: actionTypes.FETCH_DATA_DIARY,
  payload: data,
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
          dispatch(changeFarmer(true));
          dispatch(checkConfromMap(res.data[0]._id));
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
export const dataDiaryOfBatch = (dataDiary) => ({
  type: actionTypes.FETCH_DATA_DIARY_OF_BATCH,
  payload: dataDiary,
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
          //  console.log(res.data.getData);
          dispatch(dataDiaryOfBatch(res.data.getDataDiaryOfCoopera));
          dispatch(fetchBatchList(res.data.getData));
          dispatch(checkConfromMap(id));
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

export const deleteStumpFetch = (data) => {
  console.log(data);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .put(
          `http://localhost:3456/deleteStump`,
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

export const conFromMapFetch = (data) => {
  console.log(data);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .post(
          `http://localhost:3456/confrommap`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          dispatch(checkConfromMap(data.idFarmer));
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

export const checkConfromMap = (data) => {
  console.log(data);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .post(
          `http://localhost:3456/checkmap`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          console.log("alo" + res.data);
          // if (res.data.message === true) {
          //   dispatch(fetchCheckedMap(true));
          //   return;
          // }
          dispatch(fetchCheckedMap(res.data));
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

export const getDataDiaryFetch = (data) => {
  console.log(data);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .post(
          `http://localhost:3456/getdatadiary`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchDataDiary(res.data));
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
