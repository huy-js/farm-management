import jwt_decode from "jwt-decode";
import * as types from "./actionType";


 const tokenJSON = JSON.parse(localStorage.getItem("userToken"));
// // const accessToken = tokenJSON.accessToken;
// // const decoded = jwt_decode(accessToken);
// // console.log(decoded)

let userData = ()=>{
  const accessToken = tokenJSON.accessToken;
  const decoded = jwt_decode(accessToken);
  return decoded.data
}
const initialState = {
  currentUser: tokenJSON ? userData() : {} 
};
// const initialState = {
//   currentUser: {}
// };

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
