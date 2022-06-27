import { GET_ALL_PRIORITY, GET_ALL_STATUS, GET_ALL_TASK_TYPE } from "../actions/constName";

const initialState = {
  priorityAll: [],
  taskTypes: [],
  statusAll: [],
};

const createTaskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRIORITY:
      return { ...state, priorityAll: payload };

    case GET_ALL_TASK_TYPE: {
      return { ...state, taskTypes: payload };
    }

    case GET_ALL_STATUS: {
      return { ...state, statusAll: payload };
    }

    default:
      return state;
  }
};
export default createTaskReducer;
