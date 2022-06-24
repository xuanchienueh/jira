import {
  ADD_USER_IN_PROJECT,
  GET_MEMBER_BY_PROJECT_ID,
  GET_USER,
  LOG_IN,
} from "redux/saga/JiraSaga/actions/constName";
import { TOKEN_JIRA, USER_JIRA } from "utils/config";
import { history } from "../../../../App";

let infoUser = JSON.parse(localStorage.getItem(USER_JIRA));

const initialState = {
  infoUser: infoUser ? infoUser : {},
  listUser: [],
  memberOfProject: [],
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      localStorage.setItem(USER_JIRA, JSON.stringify(payload));
      localStorage.setItem(TOKEN_JIRA, payload.accessToken);
      state.infoUser = payload;
      history.push("/");
      return { ...state };

    case GET_USER: {
      return { ...state, listUser: payload };
    }

    case ADD_USER_IN_PROJECT: {
      let index = state.listUser.findIndex((user) => user.userID === payload.userId);
      state.listUser.splice(index, 1);
      return { ...state };
    }

    case GET_MEMBER_BY_PROJECT_ID: {
      return { ...state, memberOfProject: payload };
    }
    default:
      return state;
  }
};
export default UserReducer;
