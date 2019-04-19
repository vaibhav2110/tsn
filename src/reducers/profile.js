import {
  GET_PROFILE,
  GET_ACTIVITY,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  FOLLOWING_USER_SUCCESS,
  UNFOLLOWING_USER_SUCCESS,
  CHANGE_PIC
} from "../common/types";

const INITIAL_STATE = {
  profile: null,
  profileId: null,
  activity: null,
  error: "",
  loading: false
};

//Redux state for user profile
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        error: "",
        profile: action.payload.profile,
        profileId: action.payload.profile._id,
        loading: false
      };
    case CHANGE_PIC:
      return {
        ...state,
        profile: action.payload.profile
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload
      };
    case FOLLOWING_USER_SUCCESS:
      return {
        ...state,
        activity: action.payload.activity
      };
    case UNFOLLOWING_USER_SUCCESS:
      return {
        ...state,
        activity: action.payload.activity
      };
    case CREATE_PROFILE:
      return { ...state, loading: true };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        error: "",
        profileId: action.payload.id,
        loading: false
      };
    case CREATE_PROFILE_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
