// userReducer.js
import {
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
} from "./userActions";

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
