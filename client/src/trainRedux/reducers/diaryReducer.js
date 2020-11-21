import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resBatchArray: [],
  resArray: [],
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

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FARMER_DATA:
      return fetchFarmerData(state, action);
    case actionTypes.FETCH_BATCH_LIST:
      return fetchBatchList(state, action);
    default:
      return state;
  }
};

export default reducer;
