export const ShowLoading = "ShowLoading";
export const HideLoading = "HideLoading";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ShowLoading:
      state.isLoading = true;
      return { ...state };

    case HideLoading:
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
};
export default loadingReducer;
