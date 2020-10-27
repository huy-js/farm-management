//import * as types from "../actionType";
import axios from "axios";
//import jwt_decode from "jwt-decode";
import { token } from "../../../components/helpers/checkLogin";
import * as actions from "../../action/actionAuth";
export const showFarmerFetch = (id) => {
  //console.log(id);
  return (dispatch) => {
    //const token = localStorage.userToken;
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
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
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
    // const token = localStorage.userToken;
    // console.log(datacreate);
    console.log(dataFamer);
    if (token && check) {
      //  console.log(check);
      // dispatch(actions.authFail(""));
      const accessToken = JSON.parse(token).accessToken;
      // console.log(accessToken);
      // return axios
      //   .post(
      //     "http://localhost:3456/createfarmer",
      //     {
      //       dataFamer,
      //     },
      //     {
      //       headers: { Authorization: `${accessToken}` },
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     return true;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // localStorage.clear();
      //     return false;
      //     //dispatch(actions.authFail("thong tin dang ky khong hop le"));
      //   });
    } else {
      console.log("co loi create");
      //localStorage.removeItem("userToken");
      // dispatch(actions.authFail("thong tin dang ky khong hop le"));
      return false;
    }
  };
};

// export const findInforProductFetch = () => {
//   //  console.log(id)
//   return (dispatch) => {
//     //const token = localStorage.userToken;
//     // console.log(datacreate);
//     // console.log(token);
//     if (token) {
//       const accessToken = JSON.parse(token).accessToken;
//       // console.log(accessToken);
//       return axios
//         .get(`http://localhost:3456/findinforproduct/${data1}/${data2}`, {
//           headers: { Authorization: `${accessToken}` },
//         })
//         .then((res) => {
//           console.log(res.data);
//           return res.data;
//         })
//         .catch((error) => {
//           console.log(error);
//           localStorage.clear();
//         });
//     } else {
//       console.log("ko token");
//       localStorage.removeItem("userToken");
//     }
//   };
// };
