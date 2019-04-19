import server from "../apis/server";
import {
  GET_PROFILE,
  GET_ACTIVITY,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  GET_USER_PROFILE,
  FOLLOWING_USER,
  FOLLOWING_USER_SUCCESS,
  FOLLOWING_USER_FAIL,
  UNFOLLOWING_USER,
  UNFOLLOWING_USER_FAIL,
  UNFOLLOWING_USER_SUCCESS,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWINGS,
  RESET_PROFILE,
  EDIT_PROFILE,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  CHANGE_PIC
} from "../common/types";
import { showLoading, hideLoading } from 'react-redux-loading-bar';

//Action for getting own profile
export const getProfile = token => async dispatch => {
  try {
    const response = await server.get("/profiles", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting others profile
export const getUserProfile = id => async dispatch => {
  dispatch({ type: RESET_PROFILE });
  dispatch(showLoading());
  try {
    const response = await server.get(`/profiles/view/${id}`);
    console.log(response);
    dispatch(hideLoading())
    dispatch({ type: GET_USER_PROFILE, payload: response.data });
  } catch (err) {
    dispatch(hideLoading());
    console.log(err);
  }
};

//Action for getting followers of a user
export const getUserFollowers = id => async dispatch => {
  try {
    const response = await server.get(`/activity/${id}/followers`);
    console.log(response);
    dispatch({ type: GET_USER_FOLLOWERS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting followings of a user
export const getUserFollowings = id => async dispatch => {
  try {
    const response = await server.get(`/activity/${id}/followings`);
    console.log(response);
    dispatch({ type: GET_USER_FOLLOWINGS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

//Action for following a user
export const followUser = (id, token) => async dispatch => {
  dispatch({ type: FOLLOWING_USER });
  try {
    const response = await server.post(
      `/activity/${id}/follow`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: FOLLOWING_USER_SUCCESS, payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FOLLOWING_USER_FAIL });
  }
};

//Action for unfollowing a user
export const unfollowUser = (id, token) => async dispatch => {
  dispatch({ type: UNFOLLOWING_USER });
  try {
    const response = await server.post(
      `/activity/${id}/unfollow`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: UNFOLLOWING_USER_SUCCESS, payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: UNFOLLOWING_USER_FAIL });
  }
};

//Action for getting user activity
export const getActivity = token => async dispatch => {
  try {
    const response = await server.get("/activity", {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    console.log(err);
  }
};

//Action for creating profile
export const createProfile = (token, formValues) => async dispatch => {
  dispatch({ type: CREATE_PROFILE });
  try {
    const response = await server.post("/profiles", formValues, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: CREATE_PROFILE_FAIL, payload: err.response.data });
  }
};

//Action for editting profile
export const editProfile = (token, formValues) => async dispatch => {
  dispatch({ type: EDIT_PROFILE });
  try {
    const response = await server.put("/profiles/edit", formValues, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: EDIT_PROFILE_FAIL, payload: err.response.data });
  }
};

export const changePic = (profile) => {
  console.log(profile);
  return {
    type: CHANGE_PIC,
    payload: profile
  }
}
