//import * as types from "../actionType";
import axios from "axios";
//import jwt_decode from "jwt-decode";
import { token } from "../../../components/helpers/checkLogin";
import * as actionTypes from "../actionType";
// import * as actions from "../../action/actionAuth";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
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

export const showListFarmerMapsFetch = (id) => {
  //console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;
    // console.log(datacreate);
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      //console.log(accessToken);
      return axios
        .get(`http://localhost:3456/showlistfarmer/${id}`, {
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
export const ExportListQrDiary = (id) => {
  console.log(id);
  return (dispatch) => {
    const token = localStorage.userToken;

    if (token) {
      const accessToken = JSON.parse(token).accessToken;

      return axios
        .post(
          `http://localhost:3456/exportfileqrdiary`,
          { id },
          {
            headers: { Authorization: `${accessToken}` },
          },
          { responseType: "blob" }
        )
        .then((res) => {
          console.log(res.data.dataDowload);
          let json = JSON.stringify(res.data.dataDowload);
          let buffer = Buffer.from(JSON.parse(json).data);
          //  let readUTF8 = buffer.toString("utf8");
          //  let blob = "";
          let Date = new Date().getTime();
          FileSaver.saveAs(
            new Blob([buffer], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            `FileQrDiary_${Date}.xlsx`
          );
          // xuat file qr danh sach nhat ky
          //  exportToCSV(res.data.dataDowload);
          // dispatch(fetchDataDiary(res.data));
          //  convertData(res.data.dataDowload);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("ko token");
    }
  };
};

// const fileType =
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// const fileExtension = ".xlsx";
// const exportToCSV = (csvData) => {
//   let dataDone = "";
//   let check = false;
//   //const ws = XLSX.utils.json_to_sheet(csvData);
//   csvData.forEach((e, index) => {
//     let Max = e.batchs.lenght;
//     var ws = XLSX.utils.json_to_sheet(
//       [{ S: 1, h: 2, e: 3, e_1: 4, t: 5, J: 6, S_1: 7 }],
//       { header: ["S", "h", "e", "e_1", "t", "J", "S_1"] }
//     );
//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     if (index + 1 === Max) {
//       check = true;
//       dataDone = data;
//     }
//   });
//   // var ws = XLSX.utils.json_to_sheet(
//   //   [{ S: 1, h: 2, e: 3, e_1: 4, t: 5, J: 6, S_1: 7 }],
//   //   { header: ["S", "h", "e", "e_1", "t", "J", "S_1"] }
//   // );

//   // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   // const data = new Blob([excelBuffer], { type: fileType });
//   if (check) {
//     FileSaver.saveAs(dataDone, "dataQrDiarys" + fileExtension);
//   }
// };
// const convertData = (dataQr) => {
//   let newArray = dataQr.map((e) => {
//     return {
//       nameFarmer: e.nameFarmer,
//       batchs: e.batchs,
//     };
//   });
//   console.log(newArray);
//   exportToCSV(dataQr);
// };
