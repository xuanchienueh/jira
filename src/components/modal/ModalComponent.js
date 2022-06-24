import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../redux/modal/modalReducer";

function ModalComponent() {
  const dispatch = useDispatch();
  const { show, headerModal, dialogClassName, size, componentBody } = useSelector(
    (state) => state.modalReducer
  );

  return (
    <div>
      <Modal
        show={show}
        onHide={() => dispatch({ type: CLOSE_MODAL })}
        dialogClassName={dialogClassName}
        aria-labelledby="example-custom-modal-styling-title"
        size={size}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{headerModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{componentBody}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: CLOSE_MODAL })}>
            {contentBtnClose}
          </Button>
          <Button variant="primary" onClick={() => dispatch({ type: CLOSE_MODAL })}>
            {contentBtnSave}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default ModalComponent;
