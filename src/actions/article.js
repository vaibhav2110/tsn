import server from "../apis/server";
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  GET_ARTICLES,
  GET_TOP_ARTICLES,
  GET_FOLLOWING_ARTICLES,
  GET_ARTICLE,
  RESET_ARTICLE,
  GET_ACTIVITY,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAIL,
  DISLIKE_ARTICLE_FAIL,
  DISLIKE_ARTICLE_SUCCESS,
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  LIKE_COMMENT,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_FAIL,
  DISLIKE_COMMENT_SUCCESS,
  BOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAIL,
  RECORD_ENGAGEMENT,
  GET_USER_ARTICLES,
  EDIT_ARTICLE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAIL,
  DELETE_ARTICLE,
  DELETE_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS
} from "../common/types";

//Action for creating article
export const createArticle = (token, formValues) => async dispatch => {
  console.log(formValues);
  dispatch({ type: CREATE_ARTICLE });
  try {
    const response = await server.post("/articles", formValues, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: CREATE_ARTICLE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: CREATE_ARTICLE_FAIL, payload: err.response.data });
  }
};

//Action for editting article
export const editArticle = (token, articleId, formValues) => async dispatch => {
  console.log(formValues);
  dispatch({ type: EDIT_ARTICLE });
  try {
    const response = await server.put(`/articles/${articleId}/edit`, formValues, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: EDIT_ARTICLE_SUCCESS, payload: response.data.article });
  } catch (err) {
    dispatch({ type: EDIT_ARTICLE_FAIL, payload: err.response.data });
  }
};

//Action for deleting article
export const deleteArticle = (token, articleId) => async dispatch => {
  dispatch({ type: DELETE_ARTICLE });
  try {
    const response = await server.delete(`/articles/single/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: DELETE_ARTICLE_FAIL, payload: err.response.data });
  }
};

//Action for liking an article
export const likeArticle = (token, id) => async dispatch => {
  dispatch({ type: LIKE_ARTICLE });
  try {
    const response = await server.post(
      `/articles/${id}/upvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: GET_ARTICLE, payload: response.data.article });
    dispatch({ type: LIKE_ARTICLE_SUCCESS });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    dispatch({ type: LIKE_ARTICLE_FAIL });
    console.log(err);
  }
};

//Action for disliking an article
export const dislikeArticle = (token, id) => async dispatch => {
  dispatch({ type: DISLIKE_ARTICLE });
  try {
    const response = await server.post(
      `/articles/${id}/downvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: GET_ARTICLE, payload: response.data.article });
    dispatch({ type: DISLIKE_ARTICLE_SUCCESS });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    dispatch({ type: DISLIKE_ARTICLE_FAIL });
    console.log(err);
  }
};

//Action for bookmarking an article
export const bookmarkArticle = (token, id) => async dispatch => {
  dispatch({ type: BOOKMARK_ARTICLE });
  try {
    const response = await server.post(
      `/articles/${id}/bookmark`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: BOOKMARK_ARTICLE_SUCCESS });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    dispatch({ type: BOOKMARK_ARTICLE_FAIL });
    console.log(err);
  }
};

//Action for liking a comment
export const likeComment = (token, id, commentId) => async dispatch => {
  dispatch({ type: LIKE_COMMENT });
  try {
    const response = await server.post(
      `/articles/${id}/comment/${commentId}/upvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: response.data.comment });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    dispatch({ type: LIKE_COMMENT_FAIL });
    console.log(err);
  }
};

//Action for disliking a comment
export const disLikeComment = (token, id, commentId) => async dispatch => {
  dispatch({ type: DISLIKE_COMMENT });
  try {
    const response = await server.post(
      `/articles/${id}/comment/${commentId}/downvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch({ type: DISLIKE_COMMENT_SUCCESS, payload: response.data.comment });
    dispatch({ type: GET_ACTIVITY, payload: response.data.activity });
  } catch (err) {
    dispatch({ type: DISLIKE_COMMENT_FAIL });
    console.log(err);
  }
};

//Action for disliking a comment
export const deleteComment = (token, id, commentId) => async dispatch => {
  try {
    const response = await server.delete(
      `/articles/${id}/comment/${commentId}/`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(getArticleComments(id));
  } catch (err) {
    console.log(err);
  }
};

//Action for editting a comment
export const editComment = (token, id, commentId, comment) => async dispatch => {
  try {
    const response = await server.put(
      `/articles/${id}/comment/${commentId}/`, { comment },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(getArticleComments(id));
  } catch (err) {
    console.log(err);
  }
};

//Action for getting all articles
export const getArticles = () => async dispatch => {
  try {
    const response = await server.get("/articles/all/0");
    dispatch({ type: GET_ARTICLES, payload: response.data.articles });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting all articles sort by views
export const getTopArticles = () => async dispatch => {
  try {
    const response = await server.get("/articles/all/top/0");
    dispatch({ type: GET_TOP_ARTICLES, payload: response.data.articles });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting all articles of followings
export const getFollowingArticles = (token) => async dispatch => {
  try {
    const response = await server.get("/articles/all/followings/0", {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: GET_FOLLOWING_ARTICLES, payload: response.data.articles });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting a single article
export const getArticle = id => async dispatch => {
  dispatch({ type: RESET_ARTICLE });
  try {
    const response = await server.get(`/articles/single/${id}`);
    dispatch({ type: GET_ARTICLE, payload: response.data.article });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting a single article's comments
export const getArticleComments = id => async dispatch => {
  try {
    const response = await server.get(`/articles/${id}/comments`);
    dispatch({ type: GET_COMMENTS, payload: response.data.comments });
  } catch (err) {
    console.log(err);
  }
};

//Action for getting all articles of a user
export const getUserArticles = userId => async dispatch => {
  dispatch({ type: RESET_ARTICLE });
  try {
    const response = await server.get(`/articles/all/${userId}/0`);
    dispatch({ type: GET_USER_ARTICLES, payload: response.data.articles });
  } catch (err) {
    console.log(err);
  }
};

//Action for posting comment on an article
export const postComment = (token, id, formValues) => async dispatch => {
  dispatch({ type: POST_COMMENT });
  try {
    const response = await server.post(`/articles/${id}/comment`, formValues, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: POST_COMMENT_SUCCESS, payload: response.data.comment });
  } catch (err) {
    dispatch({ type: POST_COMMENT_FAIL, payload: err.response.data });
  }
};

//Action for recording user engagement
export const recordEngagement = (token, id, start_time) => async dispatch => {
  let end_time = new Date().toISOString();
  let formValues = {
    start_time,
    end_time
  };
  try {
    const response = await server.post(
      `/articles/${id}/engagement`,
      formValues,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log(response);
    dispatch({ type: RECORD_ENGAGEMENT });
  } catch (err) {
    console.log(err);
  }
};
