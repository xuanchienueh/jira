import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MEMBER_BY_PROJECT_ID_SAGA_API,
  REMOVE_USER_FROM_TASK_SAGA_API,
  UPDATE_TASK_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";
import { CLOSE_MODAL, OPEN_MODAL } from "redux/modal/modalReducer";

function Assignees({ taskDetail }) {
  const dispatch = useDispatch();
  const deleteUserFromTask = (user) => {
    let payload = { taskId: taskDetail.taskId, userId: user.id };
    dispatch({ type: REMOVE_USER_FROM_TASK_SAGA_API, payload });
  };

  return (
    <div className="assignees">
      <h6>ASSIGNEES</h6>
      <div className="d-flex align-items-center flex-wrap">
        {taskDetail.assigness?.map((item, i) => (
          <div key={i} className="item mb-1 align-items-center d-flex">
            <p className="d-flex align-items-center name">
              <span className="mr-2">{item.name}</span>
              <span onClick={() => deleteUserFromTask(item)}>
                <i className="fa fa-times" role="button" />
              </span>
            </p>
          </div>
        ))}

        <div
          className="d-flex align-items-center"
          role="button"
          onClick={() => {
            dispatch({
              type: OPEN_MODAL,
              payload: {
                componentBody: <AddUserInTask taskDetail={taskDetail} />,
                headerModal: "Add User in Task",
                dialogClassName: "",
                size: "sm",
              },
            });
          }}
        >
          <i className="fa fa-plus mr-2" />
          <span>Add more</span>
        </div>
      </div>
    </div>
  );
}

export default Assignees;

//--
function AddUserInTask({ taskDetail }) {
  const dispatch = useDispatch();

  const { memberOfProject } = useSelector((state) => state.UserReducer);
  let memberNotInTask = memberOfProject.filter((member) => {
    return !taskDetail.assigness.some((item) => item.id === member.userId);
  });

  useEffect(() => {
    dispatch({ type: GET_MEMBER_BY_PROJECT_ID_SAGA_API, payload: taskDetail.projectId });

    return () => {};
  }, []);

  let taskClone = {
    listUserAsign: taskDetail.assigness,
    taskId: taskDetail.taskId,
    taskName: taskDetail.taskName,
    description: taskDetail.description,
    statusId: taskDetail.statusId,
    originalEstimate: taskDetail.originalEstimate,
    timeTrackingSpent: taskDetail.timeTrackingSpent,
    timeTrackingRemaining: taskDetail.timeTrackingRemaining,
    projectId: taskDetail.projectId,
    typeId: taskDetail.typeId,
    priorityId: taskDetail.priorityId,
  };

  function addUserInTask(item) {
    item = item.userId;
    let listUserAsign = taskClone.listUserAsign.map((user) => user.id);
    listUserAsign.push(item);
    dispatch({
      type: UPDATE_TASK_SAGA_API,
      payload: { ...taskClone, listUserAsign },
    });

    dispatch({ type: CLOSE_MODAL });
  }

  return (
    <>
      <h4>List member of project:</h4>
      <div>
        {memberNotInTask?.map((item, i) => (
          <div
            key={i}
            className="d-flex align-items-center mb-3"
            role="button"
            onClick={() => addUserInTask(item)}
          >
            <img className="rounded-circle" src={item.avatar} alt={item.name} width={30} />
            <span className="ml-3">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
