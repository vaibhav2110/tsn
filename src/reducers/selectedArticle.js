import {
  GET_ARTICLE,
  RESET_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_ARTICLE_FAIL,
  LIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_FAIL,
  DISLIKE_ARTICLE_SUCCESS,
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  LIKE_COMMENT,
  LIKE_COMMENT_FAIL,
  LIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_FAIL,
  DISLIKE_COMMENT_SUCCESS,
  BOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAIL,
  EDIT_ARTICLE,
  EDIT_ARTICLE_FAIL,
  EDIT_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
  DELETE_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS
} from "../common/types";

const INITIAL_STATE = {
  article: null,
  liking: false,
  disliking: false,
  bookmarking: false,
  commenting: false,
  commentliking: false,
  commentdisliking: false,
  editting: false,
  deleting: false,
  comments: []
};

//Redux state for selected article
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLE:
      return { ...state, article: action.payload };
    case RESET_ARTICLE:
      return { ...INITIAL_STATE };
    case EDIT_ARTICLE:
      return { ...state, editting: true };
    case EDIT_ARTICLE_SUCCESS:
      return { ...state, editting: false, article: action.payload };
    case EDIT_ARTICLE_FAIL:
      return { ...state, editting: false };
    case DELETE_ARTICLE:
      return { ...state, deleting: true };
    case DELETE_ARTICLE_SUCCESS:
      return { ...INITIAL_STATE };
    case DELETE_ARTICLE_FAIL:
      return { ...state, deleting: false };
    case LIKE_ARTICLE:
      return { ...state, liking: true };
    case LIKE_ARTICLE_SUCCESS:
      return { ...state, liking: false };
    case LIKE_ARTICLE_FAIL:
      return { ...state, liking: false };
    case DISLIKE_ARTICLE:
      return { ...state, disliking: true };
    case DISLIKE_ARTICLE_SUCCESS:
      return { ...state, disliking: false };
    case DISLIKE_ARTICLE_FAIL:
      return { ...state, disliking: false };
    case BOOKMARK_ARTICLE:
      return { ...state, bookmarking: true };
    case BOOKMARK_ARTICLE_SUCCESS:
      return { ...state, bookmarking: false };
    case BOOKMARK_ARTICLE_FAIL:
      return { ...state, bookmarking: false };
    case GET_COMMENTS:
      return { ...state, comments: [...action.payload] };
    case POST_COMMENT:
      return { ...state, commenting: true };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        commenting: false,
        comments: [...state.comments, action.payload]
      };
    case POST_COMMENT_FAIL:
      return { ...state, commenting: false };
    case LIKE_COMMENT:
      return { ...state, commentliking: true };
    case LIKE_COMMENT_FAIL:
      return { ...state, commentliking: false };
    case LIKE_COMMENT_SUCCESS:
      let updatedLikedComment = action.payload;
      let previousLikedCommentIndex = state.comments.findIndex(
        comment => comment._id === updatedLikedComment._id
      );
      state.comments[previousLikedCommentIndex] = updatedLikedComment;
      return { ...state, comments: state.comments, commentliking: false };
    case DISLIKE_COMMENT:
      return { ...state, commentdisliking: true };
    case DISLIKE_COMMENT_FAIL:
      return { ...state, commentdisliking: false };
    case DISLIKE_COMMENT_SUCCESS:
      let updatedDislikedComment = action.payload;
      let previousDislikedCommentIndex = state.comments.findIndex(
        comment => comment._id === updatedDislikedComment._id
      );
      state.comments[previousDislikedCommentIndex] = updatedDislikedComment;
      return { ...state, comments: state.comments, commentdisliking: false };
    default:
      return state;
  }
};
