import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resArray: [],
  dataCooper: "",
};

//ARRAY LIST USER
const fetchListUserData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIST_USER_DATA:
      return fetchListUserData(state, action);
    default:
      return state;
  }
};

export default reducer;
