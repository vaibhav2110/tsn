import {
  GET_USER_PROFILE,
  GET_USER_ARTICLES,
  FOLLOWING_USER,
  FOLLOWING_USER_FAIL,
  FOLLOWING_USER_SUCCESS,
  UNFOLLOWING_USER,
  UNFOLLOWING_USER_FAIL,
  UNFOLLOWING_USER_SUCCESS,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWINGS,
  RESET_PROFILE,
  EDIT_PROFILE,
  CHANGE_PIC,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL
} from "../common/types";

const INITIAL_STATE = {
  profile: null,
  followersCount: 0,
  followingsCount: 0,
  followers: null,
  followings: null,
  articles: [],
  following: false,
  unfollowing: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
        followersCount: action.payload.followersCount,
        followingsCount: action.payload.followingsCount
      };
    case EDIT_PROFILE:
      return {
        ...state,
        loading: true
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false
      };
    case CHANGE_PIC:
      return {
        ...state,
        profile: action.payload.profile
      };
    case RESET_PROFILE:
      return { ...INITIAL_STATE };
    case GET_USER_ARTICLES:
      return { ...state, articles: action.payload };
    case FOLLOWING_USER:
      return { ...state, following: true };
    case FOLLOWING_USER_SUCCESS:
      return {
        ...state,
        following: false,
        followersCount: action.payload.followersCount,
        followingsCount: action.payload.followingsCount
      };
    case FOLLOWING_USER_FAIL:
      return { ...state, following: false };
    case UNFOLLOWING_USER:
      return { ...state, unfollowing: true };
    case UNFOLLOWING_USER_SUCCESS:
      return {
        ...state,
        unfollowing: false,
        followersCount: action.payload.followersCount,
        followingsCount: action.payload.followingsCount
      };
    case UNFOLLOWING_USER_FAIL:
      return { ...state, unfollowing: false };
    case GET_USER_FOLLOWERS:
      return { ...state, followers: action.payload.followers };
    case GET_USER_FOLLOWINGS:
      return { ...state, followings: action.payload.followings };
    default:
      return state;
  }
};
