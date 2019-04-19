import { GET_TOP_ARTICLES } from "../common/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_TOP_ARTICLES:
      return [...action.payload];
    default:
      return state;
  }
};
