import { Modal, Button } from "react-bootstrap";
import React from "react";

export const OPEN_MODAL = "opent-modal";
export const CLOSE_MODAL = "close modal";
const initialState = {
  show: false,
  headerModal: "",
  dialogClassName: "modal-90w",
  size: "sm",
  componentBody: <p></p>,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      state.show = true;
      state.componentBody = payload.componentBody;
      state.headerModal = payload.headerModal;
      state.dialogClassName = payload.dialogClassName;
      return { ...state, size: payload.size };

    case CLOSE_MODAL:
      state.show = false;
      return { ...state };

    default:
      return state;
  }
};
export default modalReducer;
