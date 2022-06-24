import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "./loading/loadingReducer";
import modalReducer from "./modal/modalReducer";
import ProjectReducer from "./saga/JiraSaga/reducer/ProjectReducer";
import UserReducer from "./saga/JiraSaga/reducer/UserReducer";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  //reducer con
  UserReducer: UserReducer,
  loadingReducer: loadingReducer,
  ProjectReducer: ProjectReducer,
  modalReducer: modalReducer,
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
