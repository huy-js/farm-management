import axios from "axios";

import { token } from "../../../components/helpers/checkLogin";

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
