import * as actionTypes from "./actionType";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { token } from "../../components/helpers/checkLogin";

export const login = (userObj) => ({
  type: actionTypes.LOGIN,
  payload: userObj,
});

export const userRegisterFetch = (data, checkVali) => {
  //console.log(data);
  let check = true;
  checkVali.forEach((e) => {
    if (!e) check = false;
  });
  return (dispatch) => {
    // check validator ko can vao server
    if (check) {
      dispatch(authStart());
      return axios
        .post("http://localhost:3456/register", {
          data,
        })
        .then((res) => {
          //console.log(res);
          return true;
        })
        .catch((error) => {
          dispatch(authFail(error.response.data.message));
          return false;
        });
    } else {
      dispatch(authFail("thong tin dang ky khong hop le"));
    }
  };
};
//ko dung ??
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const userLoginFetch = (dataLogin, checkVali) => {
  //console.log(email);
  return (dispatch) => {
    let check = true;
    checkVali.forEach((e) => {
      if (!e) check = false;
    });
    // console.log(check);
    if (check) {
      dispatch(authStart());
      axios
        .post("http://localhost:3456/login", {
          email: dataLogin.email,
          password: dataLogin.password,
        })
        .then((res) => {
          const decodedToken = jwt_decode(res.data.accessToken);
          const expirationDate = new Date(new Date(decodedToken.exp) * 1000);
          localStorage.setItem("userToken", JSON.stringify(res.data));
          localStorage.setItem("userId", decodedToken.data._id);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(login(decodedToken.data));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
          dispatch(setAuthRedirectPath("/"));
        })
        .catch((error) => {
          dispatch(authFail(error.response.data.message));
          console.log(error.response.data.message);
        });
    } else {
      dispatch(authFail("thong tin ko hop le"));
    }
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const checkUserLogin = () => {
  return (dispatch) => {
    //  const token = localStorage.userToken;
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        // dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
        return axios
          .get("http://localhost:3456/checklogin", {
            headers: { Authorization: `${accessToken}` },
          })
          .then((res) => {
            const decodedToken = jwt_decode(accessToken);
            dispatch(login(decodedToken.data));
            dispatch(authCheckTrue());
            // dispatch(checkUserLoginGetData());
            dispatch(setAuthRedirectPath("/"));
          })
          .catch((error) => {
            dispatch(authCheckFalse());
            dispatch(authLogout());
          });
      }
    } else {
      console.log("ko Token");
    }
  };
};
// ko dung'
export const checkUserLoginGetData = () => {
  return (dispatch) => {
    const newId = localStorage.getItem("userId");
    console.log(newId);
    return axios
      .get(`http://localhost:3456/getById/${newId}`)
      .then((res) => {
        dispatch(login(res.data.user));
      })
      .catch((error) => {
        // dispatch(authCheckFalse());
        // dispatch(authLogout());
        console.log("Huy");
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (Date.now() > expirationDate) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(login());
        dispatch(authSuccess(accessToken, userId));
        // dispatch(checkAuthTimeout(expirationDate));
      }
      console.log("co token");
    } else {
      console.log("ko token");
      dispatch(authLogout());
    }
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authCheckTrue = () => {
  return {
    type: actionTypes.AUTH_CHECK_TRUE,
  };
};

export const authCheckFalse = () => {
  return {
    type: actionTypes.AUTH_CHECK_FALSE,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
