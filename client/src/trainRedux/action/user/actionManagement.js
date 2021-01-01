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
export const fetchDataPwFarmer = (dataArray) => ({
  type: actionTypes.FETCH_DATA_FARMER_PW,
  payload: dataArray,
});

export const fetchDataDiary = (datadiary) => ({
  type: actionTypes.FETCH_DATA_DIARY,
  payload: datadiary,
});
// thong tin business
export const fetchBusinessData = (DataCooprera) => ({
  type: actionTypes.FETCH_BUSINESS_DATA,
  payload: DataCooprera,
});
export const showFarmerFetch = (id) => {
  //console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showfarmer/${id}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchFarmerData(res.data.listFarmer));
          dispatch(
            getListPassWordFarmer(res.data.listPWFarmer, res.data.listFarmer)
          );
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
export const userCreateFarmerFetch = (dataFamer, checkVali) => {
  let check = true;
  checkVali.forEach((e) => {
    if (!e) check = false;
  });
  return (dispatch) => {
    //dispatch(actions.authStart());
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(dataFamer);
    if (token && check) {
      //  console.log(check);
      // dispatch(actions.authFail(""));
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          "http://localhost:3456/createfarmer",
          {
            dataFamer,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(showFarmerFetch(dataFamer.idUser));
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
          //dispatch(actions.authFail("thong tin dang ky khong hop le"));
        });
    } else {
      console.log("co loi create");
      //localStorage.removeItem("userToken");
      // dispatch(actions.authFail("thong tin dang ky khong hop le"));
      return false;
    }
  };
};

export const getListPassWordFarmer = (listPWFarmer, listFarmer) => {
  let array = [];
  // console.log(listPWFarmer);
  listFarmer.forEach((e) => {
    listPWFarmer.forEach((ele) => {
      if (e._id === ele.idFarmer) {
        let valueconvert = {
          id: ele.idFarmer,
          tennongdan: e.farmOwner,
          username: ele.username,
          password: ele.password,
        };
        array.push(valueconvert);
      }
    });
  });
  console.log(array);
  return (dispatch) => {
    dispatch(fetchDataPwFarmer(array));
  };
};

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
export const showBusiness = (id) => {
  console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showbusiness/${id}`, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          dispatch(fetchBusinessData(res.data));
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
export const userCompanyFetch = (dataFamer, checkVali) => {
  console.log(dataFamer);
  let check = true;
  checkVali.forEach((e) => {
    if (!e) check = false;
  });
  return (dispatch) => {
    //dispatch(actions.authStart());
    const token = localStorage.userToken;
    // console.log(datacreate);
    // console.log(dataFamer);
    if (token && check) {
      //  console.log(check);
      // dispatch(actions.authFail(""));
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .post(
          "http://localhost:3456/createCompany",
          {
            dataFamer,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(showBusiness(dataFamer.idUser));
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
          //dispatch(actions.authFail("thong tin dang ky khong hop le"));
        });
    } else {
      console.log("co loi create");
      //localStorage.removeItem("userToken");
      // dispatch(actions.authFail("thong tin dang ky khong hop le"));
      return false;
    }
  };
};
export const deleteBusinessUserFetch = (data) => {
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
          `http://localhost:3456/deletebusiness`,
          { data },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          // console.log(res);
          //console.log(res.data);
          dispatch(showBusiness(data.iduser));
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
export const userUpdateDataFarmer = (dataFamer, checkVali) => {
  let check = true;
  checkVali.forEach((e) => {
    if (!e) check = false;
  });
  return (dispatch) => {
    //dispatch(actions.authStart());
    const token = localStorage.userToken;
    console.log(check);
    //console.log(dataFamer);
    if (token && check) {
      // console.log(check);
      // dispatch(actions.authFail(""));
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .put(
          "http://localhost:3456/updatedatafarmer",
          {
            dataFamer,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(showFarmerFetch(dataFamer.idUser));
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
          //dispatch(actions.authFail("thong tin dang ky khong hop le"));
        });
    } else {
      console.log("co loi create");
      //localStorage.removeItem("userToken");
      // dispatch(actions.authFail("thong tin dang ky khong hop le"));
      return false;
    }
  };
};
export const deleteFarmerFetch = (data) => {
  console.log(data);
  return (dispatch) => {
    //dispatch(actions.authStart());
    const token = localStorage.userToken;
    const accessToken = JSON.parse(token).accessToken;
    // console.log(accessToken);
    return axios
      .put(
        "http://localhost:3456/deletefarmer",
        {
          data,
        },
        {
          headers: { Authorization: `${accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(showFarmerFetch(data.idUser));
        return true;
      })
      .catch((error) => {
        console.log(error);
        // localStorage.clear();
        return false;
        //dispatch(actions.authFail("thong tin dang ky khong hop le"));
      });
  };
};
export const updatePolysonFetch = (dataUpdate, idFarmer, idUser, PolyArray) => {
  console.log(dataUpdate);

  let dataUp = dataUpdate.map((e) => {
    let LatLngs = e.LatLng.map((ele) => {
      // console.log(ele);
      let ls = ele.map((els) => {
        return {
          lat: els.lat,
          lng: els.lng,
        };
      });
      return ls;
    });
    e.LatLng = LatLngs[0];
    return e;
  });
  // console.log(dataUp);
  // console.log(PolyArray);
  let arrayNew = dataUp.concat(PolyArray);
  // xoa trung neu co :v
  const seen = new Set();
  const LastArray = arrayNew.filter((el) => {
    const duplicate = seen.has(el.idpoly);
    seen.add(el.idpoly);
    return !duplicate;
  });

  console.log(LastArray);

  // console.log(arrayNew);
  let data = {
    idFarmer: idFarmer,
    dataUpdate: LastArray,
  };
  return (dispatch) => {
    const token = localStorage.userToken;
    const accessToken = JSON.parse(token).accessToken;
    // console.log(accessToken);
    return axios
      .put(
        "http://localhost:3456/updatepolyson",
        {
          data,
        },
        {
          headers: { Authorization: `${accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(showFarmerFetch(idUser));
        //return true;
      })
      .catch((error) => {
        console.log(error);
        // localStorage.clear();
        return false;
        //dispatch(actions.authFail("thong tin dang ky khong hop le"));
      });
  };
};

export const updateMarkerFetch = (
  dataUpdate,
  idBusiness,
  idUser,
  PolyArray
) => {
  console.log(dataUpdate);

  let dataUp = dataUpdate.map((e) => {
    //  let LatLng = [e.LatLng.lat, e.LatLng.lng];
    return {
      lat: e.LatLng.lat,
      lng: e.LatLng.lng,
      idpoly: e.idpoly,
    };
  });
  console.log(dataUp);
  // console.log(PolyArray);
  let arrayNew = dataUp.concat(PolyArray);
  // xoa trung neu co :v
  const seen = new Set();
  const LastArray = arrayNew.filter((el) => {
    const duplicate = seen.has(el.idpoly);
    seen.add(el.idpoly);
    return !duplicate;
  });

  console.log(LastArray);

  // // console.log(arrayNew);
  let data = {
    idUser: idUser,
    idBusiness: idBusiness,
    dataUpdate: LastArray,
  };
  return (dispatch) => {
    const token = localStorage.userToken;
    const accessToken = JSON.parse(token).accessToken;
    // console.log(accessToken);
    return axios
      .put(
        "http://localhost:3456/updatemarker",
        {
          data,
        },
        {
          headers: { Authorization: `${accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(showBusiness(idUser));
        //return true;
      })
      .catch((error) => {
        console.log(error);
        // localStorage.clear();
        return false;
        //dispatch(actions.authFail("thong tin dang ky khong hop le"));
      });
  };
};
export const userUpdateDataBusiness = (dataFamer, checkVali) => {
  console.log(dataFamer);
  let check = true;
  checkVali.forEach((e) => {
    if (!e) check = false;
  });
  return (dispatch) => {
    // dispatch(actions.authStart());
    const token = localStorage.userToken;
    console.log(check);
    //console.log(dataFamer);
    if (token && check) {
      // console.log(check);
      // dispatch(actions.authFail(""));
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      return axios
        .put(
          "http://localhost:3456/updatedatabusiness",
          {
            dataFamer,
          },
          {
            headers: { Authorization: `${accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(showBusiness(dataFamer.idUser));
          return true;
        })
        .catch((error) => {
          console.log(error);
          // localStorage.clear();
          return false;
          //dispatch(actions.authFail("thong tin dang ky khong hop le"));
        });
    } else {
      console.log("co loi luc cap nhat");
      //localStorage.removeItem("userToken");
      // dispatch(actions.authFail("thong tin dang ky khong hop le"));
      return false;
    }
  };
};
