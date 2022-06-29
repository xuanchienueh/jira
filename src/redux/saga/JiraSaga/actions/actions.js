import { call, delay, fork, take, takeEvery, takeLatest, put, select } from "redux-saga/effects";
import {
  assignUserProjectSv,
  createProjectSV,
  deleteProjectSV,
  getAllProjectSV,
  getCategorySV,
  getDetailProjectSV,
  getTaskDetailSV,
  updateProjectSV,
  removeUserFromProjectSV,
  updateStatusSV,
  updatePrioritySV,
  updateEstimateSV,
  updateTimeTrackingSV,
  removeUserFromTaskSV,
  assignUserTaskSv,
  updataDecriptionSV,
  updateTaskSV,
} from "services/projectService";
import * as constants from "./constName";
import { HideLoading, ShowLoading } from "redux/loading/loadingReducer";
import store from "redux/configStore";
import { getUserByProjectIdSV, getUserSV, loginService } from "services/userServices";
import {
  createTaskSV,
  getAllPrioritySV,
  getAllStatusSV,
  getAllTaskTypeSV,
} from "services/createTaskService";
import { CLOSE_MODAL } from "redux/modal/modalReducer";
import {
  GET_DETAIL_PROJECT_SAGA_API,
  ASSIGN_USER_TASK_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";

//Quản lý các action saga
function* login(action) {
  try {
    yield put({ type: ShowLoading });
    yield delay(500);
    let result = yield call(() => loginService(action.payload));
    const state = store.getState();
    console.log(state); /* trả về tất cả các reducer con trong rootReducer */

    yield put({ type: constants.LOG_IN, payload: result.data.content });
    yield put({ type: HideLoading });
  } catch (errors) {
    yield put({ type: HideLoading });
    console.log("tai khoan hoac mat khau không dung!", errors);
  }
}
export function* loginTheodoi() {
  yield takeLatest(constants.LOGIN_SAGA_API, login);
}

//
export const getCategory = async (dispatch) => {
  try {
    let result = await getCategorySV();
    dispatch({ type: constants.GET_CATEGORY, payload: result });
  } catch (err) {
    console.log("get category fail", err);
  }
};

function* createProject(action) {
  try {
    // yield put({ type: ShowLoading });
    let result = yield call(() => {
      return createProjectSV(action.payload);
    });

    yield delay(10);
    // yield put({ type: HideLoading });
  } catch (err) {
    yield put({ type: HideLoading });
    console.log("create project fail", err);
  }
}

export function* createProjectSaga() {
  yield takeLatest(constants.CREATE_PROJECT_SAGA_API, createProject);
}

function* getAllProject(action) {
  try {
    yield put({ type: ShowLoading });
    let result = yield call(() => getAllProjectSV(action.payload));
    yield put({ type: constants.GET_ALL_PROJECT, payload: result.data.content });
    // yield delay(500);
    yield put({ type: HideLoading });
  } catch (err) {
    yield put({ type: HideLoading });

    console.log("get all project fail", err);
  }
}

export function* getAllProjectSaga() {
  yield takeLatest(constants.GET_ALL_PROJECT_SAGA_API, getAllProject);
}

function* deleteProject(action) {
  try {
    yield put({ type: ShowLoading });
    let result = yield call(() => deleteProjectSV(action.payload));
    const { ProjectReducer } = store.getState();

    if (result.status === 200) {
      yield put({ type: constants.DELETE_PROJECT, payload: result.data.content[0] });
      yield put({ type: constants.GET_ALL_PROJECT_SAGA_API, payload: ProjectReducer.keySearchPJ });
    }
    yield delay(300);
    yield put({ type: HideLoading });
  } catch (err) {
    yield put({ type: HideLoading });
    console.log("delete project fail", err);
  }
}

export function* deleteProjectSaga() {
  yield takeLatest(constants.DELETE_PROJECT_SAGA_API, deleteProject);
}

function* getDetailProject(action) {
  try {
    let result = yield call(() => getDetailProjectSV(action.payload));
    if (result.status === 200)
      yield put({ type: constants.GET_DETAIL_PROJECT, payload: result.data.content });
  } catch (err) {
    console.log("get detail project fail", err);
  }
}

export function* getDetailProjectSaga() {
  yield takeLatest(constants.GET_DETAIL_PROJECT_SAGA_API, getDetailProject);
}

function* updateProject({ payload }) {
  try {
    let result = yield call(() => updateProjectSV(payload.projectId, payload.infoUpdate));

    const { ProjectReducer } = store.getState();

    yield put({ type: constants.GET_ALL_PROJECT_SAGA_API, payload: ProjectReducer.keySearchPJ });
  } catch (err) {
    console.log("update project fail", err);
  }
}

export function* updateProjectSaga() {
  yield takeLatest(constants.UPDATE_PROJECT_SAGA_API, updateProject);
}

function* getUser(action) {
  try {
    let result = yield call(() => getUserSV(action.payload));
    yield put({ type: constants.GET_USER, payload: result.data.content });
  } catch (err) {
    console.log("get all user fail", err);
  }
}

export function* getUserSaga() {
  yield takeLatest(constants.GET_USER_SAGA_API, getUser);
}

function* assignUserProject(action) {
  try {
    let { status } = yield call(() => assignUserProjectSv(action.payload));
    const { ProjectReducer } = store.getState();
    if (status === 200) {
      yield put({ type: constants.GET_ALL_PROJECT_SAGA_API, payload: ProjectReducer.keySearchPJ });
      yield put({ type: constants.ADD_USER_IN_PROJECT, payload: action.payload });
    }
  } catch (err) {
    console.log("assign user project fail", err);
  }
}

export function* assignUserProjectSaga() {
  yield takeLatest(constants.ADD_USER_IN_PROJECT_SAGA_API, assignUserProject);
}

function* getMemberInProject(action) {
  try {
    let result = yield call(() => getUserByProjectIdSV(action.payload));
    yield put({ type: constants.GET_MEMBER_BY_PROJECT_ID, payload: result.data.content });
  } catch (errors) {
    yield put({ type: constants.GET_MEMBER_BY_PROJECT_ID, payload: [] });
    console.log("get member in project fail", errors);
  }
}

export function* getMemberInProjectSaga() {
  yield takeLatest(constants.GET_MEMBER_BY_PROJECT_ID_SAGA_API, getMemberInProject);
}

function* removeUserFromProject({ payload }) {
  try {
    let { status } = yield call(() => removeUserFromProjectSV(payload));
    if (status === 200) {
      yield put({ type: constants.GET_MEMBER_BY_PROJECT_ID_SAGA_API, payload: payload.projectId });
    }
  } catch (errors) {
    console.log("removeUserFromProject fali", errors);
  }
}

export function* removeUserFromProjectSaga() {
  yield takeLatest(constants.REMOVE_USER_FROM_PROJECT_SAGA_API, removeUserFromProject);
}

function* getAllPriority() {
  try {
    let result = yield call(() => getAllPrioritySV());
    yield put({ type: constants.GET_ALL_PRIORITY, payload: result.data.content });
  } catch (errors) {
    console.log("get priority fail", errors);
  }
}

export function* getAllPrioritySaga() {
  yield takeLatest(constants.GET_ALL_PRIORITY_SAGA_API, getAllPriority);
}

function* getAllTaskType() {
  try {
    let result = yield call(() => getAllTaskTypeSV());
    yield put({ type: constants.GET_ALL_TASK_TYPE, payload: result.data.content });
  } catch (errors) {
    console.log("get status fail", errors);
  }
}

export function* getAllTaskTypeSaga() {
  yield takeLatest(constants.GET_ALL_TASK_TYPE_SAGA_API, getAllTaskType);
}

function* createTask({ payload }) {
  try {
    let result = yield call(() => createTaskSV(payload));
    if (result.status === 200) yield put({ type: CLOSE_MODAL });
    console.log("create task result", result);
    yield put({ type: constants.CREATE_TASK, payload: result.data.content });
  } catch (errors) {
    console.log("create task fail", errors);
  }
}

export function* createTaskSaga() {
  yield takeLatest(constants.CREATE_TASK_SAGA_API, createTask);
}

function* getAllStatus() {
  try {
    let { status, data } = yield call(() => getAllStatusSV());
    if (status === 200) yield put({ type: constants.GET_ALL_STATUS, payload: data.content });
  } catch (errors) {
    console.log("get status fail", errors);
  }
}

export function* getAllStatusSaga() {
  yield takeLatest(constants.GET_ALL_STATUS_SAGA_API, getAllStatus);
}

function* getTaskDetail(action) {
  try {
    let { status, data } = yield call(() => getTaskDetailSV(action.payload));
    if (status === 200) {
      yield put({ type: constants.GET_TASK_DETAIL, payload: data.content });
    }
  } catch (errors) {
    console.log("get task detail fail", errors);
  }
}

export function* getTaskDetailSaga() {
  yield takeLatest(constants.GET_TASK_DETAIL_SAGA_API, getTaskDetail);
}

function* updateStatus({ payload }) {
  try {
    let { status } = yield call(() => updateStatusSV(payload));
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
    yield put({ type: constants.GET_DETAIL_PROJECT_SAGA_API, payload: payload.projectId });
  } catch (errors) {
    console.log("update status fail", errors);
  }
}
export function* updateStatusSaga() {
  yield takeLatest(constants.UPDATE_STATUS_SAGA_API, updateStatus);
}

function* updatePriority({ payload }) {
  try {
    let { status } = yield call(() => updatePrioritySV(payload));
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("update priority fail", errors);
  }
}
export function* updatePrioritySaga() {
  yield takeLatest(constants.UPDATE_PRIORITY_SAGA_API, updatePriority);
}

function* updateEstimate({ payload }) {
  try {
    let { status } = yield call(() => updateEstimateSV(payload));
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("update estimate fail", errors);
  }
}

export function* updateEstimateSaga() {
  yield takeLatest(constants.UPDATE_ESTIMATE_SAGA_API, updateEstimate);
}

function* updateTimeTracking({ payload }) {
  try {
    let { status } = yield call(() => updateTimeTrackingSV(payload));
    if (status === 200) yield put({ type: constants.UPDATE_ESTIMATE_SAGA_API, payload });
  } catch (errors) {
    console.log("update time tracking fail", errors);
  }
}
export function* updateTimeTrackingSaga() {
  yield takeLatest(constants.UPDATE_TIME_TRACKING_SAGA_API, updateTimeTracking);
}

function* removeUserFromTask({ payload }) {
  console.log(payload);
  try {
    let { status } = yield call(() => removeUserFromTaskSV(payload));
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("remove user from task fail", errors);
  }
}

export function* removeUserFromTaskSaga() {
  yield takeLatest(constants.REMOVE_USER_FROM_TASK_SAGA_API, removeUserFromTask);
}

function* assignUserTask({ payload }) {
  try {
    let { status } = yield call(() => assignUserTaskSv(payload));
    // console.log(result);
    console.log("thanh cong");
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("add user to task fail", errors);
  }
}

export function* assignUserTaskSaga() {
  yield takeLatest(constants.ASSIGN_USER_TASK_SAGA_API, assignUserTask);
}

function* updataDecription({ payload }) {
  try {
    let { status } = yield call(() => updataDecriptionSV(payload));
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("update description fail", errors);
  }
}

export function* updataDecriptionSaga() {
  yield takeLatest(constants.UPDATA_DESCRIPTION_SAGA_API, updataDecription);
}

function* updateTask({ payload }) {
  try {
    let { status } = yield call(() => updateTaskSV(payload));
    console.log("update task result", status);
    if (status === 200)
      yield put({ type: constants.GET_TASK_DETAIL_SAGA_API, payload: payload.taskId });
  } catch (errors) {
    console.log("update task fail", errors);
  }
}

export function* updateTaskSaga() {
  yield takeLatest(constants.UPDATE_TASK_SAGA_API, updateTask);
}
