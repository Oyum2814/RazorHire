// userActions.js
import axios from "../utils/axios";

export const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS";
export const FETCH_USER_DETAILS_FAILURE = "FETCH_USER_DETAILS_FAILURE";

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth/user");
    const userDetails = response.data;
    dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: userDetails });
  } catch (error) {
    dispatch({ type: FETCH_USER_DETAILS_FAILURE, payload: error.message });
  }
};
