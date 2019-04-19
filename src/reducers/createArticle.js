import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_SUCCESS
} from "../common/types";

const INITIAL_STATE = {
  loading: false,
  articleId: "",
  error: ""
};

//Redux state for creating profile
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        articleId: "",
        error: "",
        loading: true
      };
    case CREATE_ARTICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        articleId: action.payload.id
      };
    default:
      return state;
  }
};
