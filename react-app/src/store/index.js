import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import loginShow from './loginShow';
import signupShow from './signupShow';
import pageList from './pages';
import createPageShow from './createPageShow';
import postList from './posts';
import currentPage from './currentPage';
const rootReducer = combineReducers({
  session,
  loginShow,
  signupShow,
  pageList,
  createPageShow,
  postList,
  currentPage
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
