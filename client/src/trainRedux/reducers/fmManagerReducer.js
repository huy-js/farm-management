import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resArray: [],
};

const fetchFarmerData = (state, action) => {
  return updateObject(state, {
    resArray : action.payload
  });
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FARMER_DATA:
      return fetchFarmerData(state, action);
    default:
      return state;
  }
};

export default reducer;
