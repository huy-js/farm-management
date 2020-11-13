import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  resArray: [],
  dataCooper: "",
  purchase: null,
  error: null,
  loading: false,
};
//PURCHASE
const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const purchaseSuccess = (state, action) => {
  return updateObject(state, { purchase: action.purchase });
};
const purchaseFail = (state, action) => {
  return updateObject(state, { error: action.error });
};
// COOPER ORDER
const fetchCoopareData = (state, action) => {
  return updateObject(state, {
    dataCooper: action.payload,
  });
};
// ARRAY ORDER
const fetchOrderData = (state, action) => {
  return updateObject(state, {
    resArray: action.payload,
  });
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_DATA:
      return fetchOrderData(state, action);
    case actionTypes.FETCH_COOPARE_DATA:
      return fetchCoopareData(state, action);
    case actionTypes.PURCHASE_START:
      return purchaseStart(state, action);
    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_FAIL:
      return purchaseFail(state, action);
    default:
      return state;
  }
};

export default reducer;
