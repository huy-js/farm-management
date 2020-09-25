import * as types from "./actionType";
import axios from "axios";
import jwt_decode from "jwt-decode";
// export const login = () => {
//   return {
//     type: types.LOGIN,
//   };
// };

export const login = (userObj) => ({
  type: types.LOGIN,
  payload: userObj,
});

export const userLoginFetch = (user) => {
  // console.log(user);
  return (dispatch) => {
    // console.log(user);
    return axios
      .post("http://localhost:3456/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        const decodedToken = jwt_decode(res.data.accessToken);
        localStorage.setItem("userToken", JSON.stringify(res.data));
        dispatch(login(decodedToken.data));
        // console.log("token");
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
    //console.log(token);
    if (token) {
      const accessToken = JSON.parse(token).accessToken;

      //console.log(accessToken);
      // if (!accessToken) return false;
      return axios
        .get("http://localhost:3456/checklogin", {
          headers: { Authorization: `${accessToken}` },
        })
        .then((res) => {
          //console.log(res.status);
          const decodedToken = jwt_decode(accessToken);
          //console.log(decodedToken);
          // kiem tra het token
          if (Date.now() > new Date(decodedToken.exp) * 1000) {
            localStorage.clear();
            return false;
          }
          dispatch(login(decodedToken.data));
          return true;
          // }
        })
        .catch((error) => {
          // console.log(error.response);
          console.log(error.response.data.message);
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
