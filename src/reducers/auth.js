import {
  LOG_IN,
  LOG_IN_FAIL,
  LOG_IN_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_OUT
} from "../common/types";
import ls from "local-storage";

const EMPTY_STATE = {
  email: "",
  userId: "",
  profileId: "",
  user: null,
  token: "",
  error: "",
  errorField: "",
  loading: false
};
const INITIAL_STATE = JSON.parse(ls.get("user")) || EMPTY_STATE;

//Redux state for authentication
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, error: "", errorField: "", loading: true };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: "",
        errorField: "",
        loading: false
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        error: action.payload.error,
        errorField: action.payload.error_field,
        loading: false
      };
    case LOG_IN:
      return { ...state, loading: true };
    case LOG_OUT:
      ls.remove("user");
      return { ...EMPTY_STATE };
    case LOG_IN_SUCCESS:
      const obj = {
        ...state,
        userId: action.payload.id,
        profileId: action.payload.profile,
        token: action.payload.token
      };
      ls.set("user", JSON.stringify(obj));
      return {
        ...state,
        userId: action.payload.id,
        profileId: action.payload.profile,
        token: action.payload.token,
        loading: false
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        error: action.payload.error,
        errorField: action.payload.error_field,
        loading: false
      };
    default:
      return state;
  }
};
