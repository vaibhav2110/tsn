import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as form } from "redux-form";
import auth from "./auth";
import profile from "./profile";
import createArticle from "./createArticle";
import articles from "./articles";
import toparticles from "./toparticles";
import followingarticles from "./followingarticles";
import selectedArticle from "./selectedArticle";
import selectedProfile from "./selectedProfile";

export default combineReducers({
  loadingBar: loadingBarReducer,
  form: form,
  auth: auth,
  profile: profile,
  articles: articles,
  toparticles: toparticles,
  followingarticles: followingarticles,
  createArticle: createArticle,
  selectedArticle: selectedArticle,
  selectedProfile: selectedProfile
});
