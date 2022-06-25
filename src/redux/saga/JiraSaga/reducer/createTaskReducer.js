import { GET_ALL_PRIORITY } from "../actions/constName";

const initialState = {
  priority: [],
};

const createTaskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRIORITY:
      return { ...state, priority: payload };

    default:
      return state;
  }
};
export default createTaskReducer;
