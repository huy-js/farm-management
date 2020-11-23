import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resBatchArray: [],
  resArray: [],
  isCheckMap: false,
};

const fetchFarmerData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};
//DIARY LIST
export const fetchBatchList = (state, action) => {
  // console.log(action);
  return updateObject(state, {
    resBatchArray: action.payload,
  });
};
//CHECKED MAP
const fetchCheckedMap = (state, action) => {
  return updateObject(state, {
    isCheckMap: action.payload,
  });
};
var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FARMER_DATA:
      return fetchFarmerData(state, action);
    case actionTypes.FETCH_BATCH_LIST:
      return fetchBatchList(state, action);
    case actionTypes.FETCH_CHECK_MAP:
      return fetchCheckedMap(state, action);
    default:
      return state;
  }
};

export default reducer;
