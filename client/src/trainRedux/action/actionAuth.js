import * as types from "../actionType";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = (userObj) => ({
  type: types.LOGIN,
  payload: userObj,
});

export const userLoginFetch = (user) => {
  console.log(user);
  return (dispatch) => {
    return axios
      .post("http://localhost:3456/loginH", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        const decodedToken = jwt_decode(res.data.accessToken);
        localStorage.setItem("userToken", JSON.stringify(res.data));
        dispatch(login(decodedToken.data));
        return true;
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return false;
      });
  };
};

export const checkUserLogin = () => {
  return (dispatch) => {
    const token = localStorage.userToken;
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      return axios
        .get("http://localhost:3456/checklogin", {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          const decodedToken = jwt_decode(accessToken);
          if (Date.now() > new Date(decodedToken.exp) * 1000) {
            localStorage.clear();
            return false;
          }
          dispatch(login(decodedToken.data));
          return true;
        })
        .catch((error) => {
          console.log(error.response);
          // console.log(error.response.data.message);
          // console.log(error.response.status);
          //localStorage.removeItem("userToken");
          localStorage.clear();
          return false;
        });
    } else {
      console.log("ko token");
      localStorage.removeItem("userToken");
      return false;
    }
  };
};
