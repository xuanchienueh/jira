import React, { useEffect, useState, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PRIORITY_SAGA_API,
  GET_ALL_STATUS_SAGA_API,
  UPDATE_PRIORITY_SAGA_API,
  UPDATE_STATUS_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";
import Assignees from "./Assignees";
import Description from "./Description";
import TimeTracking from "./TimeTracking";

function ModalTaskDetail() {
  const { taskDetail } = useSelector((state) => state.ProjectReducer);
  const { statusAll, priorityAll } = useSelector((state) => state.createTaskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA_API });
    dispatch({ type: GET_ALL_PRIORITY_SAGA_API });
  }, []);

  /*  */

  // console.log(taskDetail, timeTrackingSpent, timeTrackingRemaining);

  /*  */
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <span>{taskDetail.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: {taskDetail.taskName}</p>
                  <Description taskDetail={taskDetail} />

                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src="./assets/img/download (1).jfif" alt="123" />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>Protip:</span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment" style={{ display: "flex" }}>
                          <div className="avatar">
                            <img src="./assets/img/download (1).jfif" alt="123" />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
                              tempora ex voluptatum saepe ab officiis alias totam ad accusamus
                              molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      className="custom-select"
                      value={taskDetail.statusId}
                      onChange={(e) => updateStatus(dispatch, e, taskDetail)}
                    >
                      {statusAll?.map((item, i) => (
                        <option key={i} value={+item.statusId}>
                          {item.statusName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Assignees taskDetail={taskDetail} />

                  <div className="priority status">
                    <h6>PRIORITY</h6>
                    <select
                      className="custom-select"
                      value={taskDetail.priorityTask?.priorityId}
                      onChange={(e) => updatePriority(dispatch, e, taskDetail)}
                    >
                      {priorityAll?.map((item, i) => (
                        <option key={i} value={item.priorityId}>
                          {item.priority}
                        </option>
                      ))}
                    </select>
                  </div>

                  <TimeTracking taskDetail={taskDetail} />

                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>Update at a few seconds ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTaskDetail;

function updatePriority(dispatch, e, taskDetail) {
  dispatch({
    type: UPDATE_PRIORITY_SAGA_API,
    payload: { priorityId: +e.target.value, taskId: +taskDetail.taskId },
  });
}

function updateStatus(dispatch, e, taskDetail) {
  dispatch({
    type: UPDATE_STATUS_SAGA_API,
    payload: {
      statusId: e.target.value,
      taskId: taskDetail.taskId,
      projectId: taskDetail.projectId,
    },
  });
}
