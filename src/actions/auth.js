import server from "../apis/server";
import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  LOG_OUT
} from "../common/types";

//Action for loggingIn
export const logIn = formValues => async dispatch => {
  dispatch({ type: LOG_IN });
  try {
    const response = await server.post("/users/login", formValues);
    dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: LOG_IN_FAIL, payload: err.response.data });
  }
};

//Action for socialloggingIn
export const socialLogIn = authToken => async dispatch => {
  dispatch({ type: LOG_IN });
  try {
    dispatch({ type: LOG_IN_SUCCESS, payload: authToken });
  } catch (err) {
    dispatch({ type: LOG_IN_FAIL });
    console.log(err);
  }
};

//Action for loggingOut
export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

//Action for signingUp
export const signUp = formValues => async dispatch => {
  dispatch({ type: SIGN_UP });
  try {
    const response = await server.post("/users/create", formValues);
    dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: SIGN_UP_FAIL, payload: err.response.data });
  }
};
