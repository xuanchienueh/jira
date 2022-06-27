import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PRIORITY_SAGA_API,
  GET_ALL_STATUS_SAGA_API,
  UPDATE_ESTIMATE_SAGA_API,
  UPDATE_PRIORITY_SAGA_API,
  UPDATE_STATUS_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";

function ModalTaskDetail() {
  const { taskDetail } = useSelector((state) => state.ProjectReducer);
  const { statusAll, priorityAll } = useSelector((state) => state.createTaskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA_API });
    dispatch({ type: GET_ALL_PRIORITY_SAGA_API });
  }, []);
  console.log(taskDetail);

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
                  <div className="description">
                    <p>Description:</p>
                    <>{ReactHtmlParser(taskDetail.description)}</>
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>A bug is a problem which impairs or prevents the function of a product.</p>
                    </div>

                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
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
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="d-flex align-items-center">
                      {taskDetail.assigness?.map((item, i) => (
                        <div key={i} className="item align-items-center d-flex">
                          <p className="d-flex align-items-center name">
                            <span>{item.name}</span>
                            <i className="fa fa-times" role="button" style={{ marginLeft: 5 }} />
                          </p>
                        </div>
                      ))}

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i className="fa fa-plus" style={{ marginRight: 5 }} />
                        <span>Add more</span>
                      </div>
                    </div>
                  </div>

                  <div className="priority status" style={{ marginBottom: 20 }}>
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
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="number"
                      min={0}
                      className="estimate-hours"
                      defaultValue={taskDetail.originalEstimate}
                      onChange={(e) => updataEstimate(dispatch, e, taskDetail)}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    <div style={{ display: "flex" }}>
                      <i className="fa fa-clock" />
                      <div style={{ width: "100%" }}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${
                                (taskDetail.timeTrackingSpent * 100) / taskDetail.originalEstimate
                              }%`,
                            }}
                            aria-valuenow={
                              taskDetail.timeTrackingSpent / taskDetail.originalEstimate
                            }
                            aria-valuemin={0}
                            aria-valuemax={1}
                          />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p className="logged">{taskDetail.timeTrackingSpent}h logged</p>
                          <p className="estimate-time">
                            {taskDetail.timeTrackingRemaining}h estimated
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
    payload: { statusId: e.target.value, taskId: taskDetail.taskId },
  });
}

function updataEstimate(dispatch, e, taskDetail) {
  dispatch({
    type: UPDATE_ESTIMATE_SAGA_API,
    payload: { originalEstimate: +e.target.value, taskId: taskDetail.taskId },
  });
}
