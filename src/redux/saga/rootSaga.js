import { all } from "redux-saga/effects";
import * as actionSagaJira from "./JiraSaga/actions/actions";

export default function* rootSaga() {
  yield all([
    actionSagaJira.loginTheodoi(),
    actionSagaJira.getAllProjectSaga(),
    actionSagaJira.createProjectSaga(),
    actionSagaJira.deleteProjectSaga(),
    actionSagaJira.getDetailProjectSaga(),
    actionSagaJira.updateProjectSaga(),
    actionSagaJira.getUserSaga(),
    actionSagaJira.assignUserProjectSaga(),
    actionSagaJira.getMemberInProjectSaga(),
    actionSagaJira.removeUserFromProjectSaga(),
  ]);
}
