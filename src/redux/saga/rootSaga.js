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
    actionSagaJira.getAllPrioritySaga(),
    actionSagaJira.getAllTaskTypeSaga(),
    actionSagaJira.createTaskSaga(),
    actionSagaJira.getAllStatusSaga(),
    actionSagaJira.getTaskDetailSaga(),
    actionSagaJira.updateStatusSaga(),
    actionSagaJira.updatePrioritySaga(),
    actionSagaJira.updateEstimateSaga(),
    actionSagaJira.updateTimeTrackingSaga(),
    actionSagaJira.removeUserFromTaskSaga(),
    actionSagaJira.assignUserTaskSaga(),
    actionSagaJira.updataDecriptionSaga(),
    actionSagaJira.updateTaskSaga(),
  ]);
}
