import * as types from "./actionType";

//import jwt_decode from "jwt-decode";
// const token = localStorage.getItem("userToken");
// const userprofile = {}
// if (token !== null) {
// const accessToken = JSON.parse(token).accessToken;
// const decodedToken = jwt_decode(accessToken);

// }
const initialState = {
  currentUser: {},
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      //console.log(action);
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default myReducer;
