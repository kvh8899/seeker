import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import pageList from "./pages";
import postList from "./posts";
import currentPage from "./currentPage";
import currentPost from "./currentPost";
import isFollowing from "./checkFollow";
import postLikes from "./likes";
import sideBarPages from "./trpages";
import postComments from "./comments";
import commentsMap from "./commentsMap";
import searchPages from "./searchPages";
import stateLikes from "./stateLikes";
import {
  createPageShow,
  editPageShow,
  loginShow,
  signupShow,
  postPageShow,
  pageSelect,
} from "./toggles";

const rootReducer = combineReducers({
  session,
  loginShow,
  signupShow,
  createPageShow,
  editPageShow,
  postPageShow,
  postList,
  currentPage,
  currentPost,
  isFollowing,
  postLikes,
  postComments,
  commentsMap,
  pageList,
  pageSelect,
  sideBarPages,
  searchPages,
  stateLikes,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
