const initialState = {};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "s":
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default commentReducer;
