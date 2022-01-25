import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import pageList from "./pages";
import postList from "./posts";
import currentPage from "./currentPage";
import currentPost from "./currentPost";
import isFollowing from "./checkFollow";
import postLikes from "./likes";
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
  pageList,
  createPageShow,
  postList,
  currentPage,
  editPageShow,
  postPageShow,
  pageSelect,
  currentPost,
  isFollowing,
  postLikes,
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
