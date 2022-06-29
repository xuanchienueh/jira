import {
  DELETE_PROJECT,
  GET_ALL_PROJECT,
  GET_CATEGORY,
  GET_DETAIL_PROJECT,
  GET_TASK_DETAIL,
  KEY_SEARCH_PROJECT,
} from "../actions/constName";

const initialState = {
  category: [],
  allProject: [],
  detailProject: {},
  keySearchPJ: undefined,
  taskDetail: {},
};

const ProjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORY: {
      return { ...state, category: payload.data.content };
    }

    case KEY_SEARCH_PROJECT: {
      return { ...state, keySearchPJ: payload };
    }

    case GET_ALL_PROJECT: {
      return { ...state, allProject: payload };
    }

    case DELETE_PROJECT: {
      const allProject = state.allProject.filter((project) => project.id !== payload);
      return { ...state, allProject };
    }

    case GET_DETAIL_PROJECT: {
      return { ...state, detailProject: payload };
    }

    case GET_TASK_DETAIL: {
      return { ...state, taskDetail: payload };
    }

    default:
      return state;
  }
};
export default ProjectReducer;
