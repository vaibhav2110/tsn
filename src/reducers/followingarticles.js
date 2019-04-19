import { GET_FOLLOWING_ARTICLES } from "../common/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_FOLLOWING_ARTICLES:
      return [...action.payload];
    default:
      return state;
  }
};
