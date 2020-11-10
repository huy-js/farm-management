import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resArray: [],
  dataCooper: "",
  dataListOrderUser: [],
};
// ARRAY FARMER
const fetchFarmerData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};
// ARRAY ORDER
const fetchOrderData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};
//ARRAY LIST USER
const fetchListUserData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};
// COOPER ORDER
const fetchCoopareData = (state, action) => {
  return updateObject(state, {
    dataCooper: action.payload,
  });
};
// LIST ORDER USER
const fetchOrderUser = (state, action) => {
  return updateObject(state, {
    dataListOrderUser: action.payload,
  });
};
var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FARMER_DATA:
      return fetchFarmerData(state, action);
    case actionTypes.FETCH_ORDER_DATA:
      return fetchOrderData(state, action);
    case actionTypes.FETCH_LIST_USER_DATA:
      return fetchListUserData(state, action);
    case actionTypes.FETCH_COOPARE_DATA:
      return fetchCoopareData(state, action);
    case actionTypes.FETCH__LIST_USER_ORDER:
      return fetchOrderUser(state, action);
    default:
      return state;
  }
};

export default reducer;
