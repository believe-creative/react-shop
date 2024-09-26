import Immutable from "immutable";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducers from "./reducers";
import rootSaga from "./sagas";

const initialState = Immutable.Map();


//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//array of middlewares. In future if we add any other middleware we can add here.
const middlewares = [sagaMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false
      })
    : compose;
export const store = createStore(
  createReducers(),
  initialState,
  composeEnhancers(...enhancers)
);

sagaMiddleware.run(rootSaga);
