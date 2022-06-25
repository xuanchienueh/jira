import React from "react";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "redux/modal/modalReducer";
import CreateTask from "./createTask/CreateTask";

function Sidebar() {
  const dispatch = useDispatch();
  const startCreateTask = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        headerModal: "Create Task",
        size: "lg",
        componentBody: <CreateTask />,
      },
    });
  };
  return (
    <>
      {/* sidebar */}
      <div className="sideBar">
        <div className="sideBar-top">
          <div className="sideBar-icon">
            <i className="fab fa-jira" />
          </div>
          <div
            className="sideBar-icon"
            data-toggle="modal"
            data-target="#searchModal"
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-search" />
            <span className="title">SEARCH ISSUES</span>
          </div>
          <div className="sideBar-icon" role="button" onClick={startCreateTask}>
            <i className="fa fa-plus" />
            <span className="title">CREATE TASK</span>
          </div>
        </div>
        <div className="sideBar-bottom">
          <div className="sideBar-icon">
            <i className="fa fa-question-circle" />
            <span className="title">ABOUT</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
