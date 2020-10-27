import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  currentUser: {},
  error: null,
  isLogin: false,
  display: null,
  displayRegister: null,
  loading: false,
  authRedirectPath: "/",
};

const login = (state, action) => {
  return updateObject(state, {
    isLogin: true,
    currentUser: action.payload,
    loading: false,
    error: null,
    displayRegister: "none",
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    currentUser: {},
    error: null,
    isLogin: false,
    display: null,
    displayRegister: null,
    loading: false,
    authRedirectPath: "/",
  });
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isLogin: false,
  });
};

const authCheckTrue = (state, action) => {
  return updateObject(state, {
    isLogin: true,
    display: "block",
    displayRegister: "none",
  });
};

const authCheckFalse = (state, action) => {
  return updateObject(state, {
    isLogin: false,
    display: "none",
    displayRegister: "block",
  });
};
// ko dung
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.LOGIN:
      return login(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_CHECK_TRUE:
      return authCheckTrue(state, action);
    case actionTypes.AUTH_CHECK_FALSE:
      return authCheckFalse(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
