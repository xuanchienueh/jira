import React from "react";
import ReactHtmlPaser from "react-html-parser";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA_API } from "redux/saga/JiraSaga/actions/constName";

function ContentMain({ detailProject }) {
  // console.log(detailProject.lstTask);
  const dispatch = useDispatch();

  const renderCardTaskList = (listTask) => {
    return listTask?.map((task) => (
      <div key={task.statusId} className="card" style={{ width: "17rem", height: "auto" }}>
        <div className="card-header">{task.statusName}</div>
        <ul className="list-group list-group-flush">
          {task.lstTaskDeTail?.map((taskDetail, i) => (
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
              key={i}
              onClick={() => {
                dispatch({ type: GET_TASK_DETAIL_SAGA_API, payload: taskDetail.taskId });
              }}
            >
              <h5>{taskDetail.taskName}</h5>
              <>{ReactHtmlPaser(taskDetail.description)}</>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <span className="text-warning">{taskDetail.priorityTask.priority}</span>
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    {taskDetail.assigness?.map((assign, i) => (
                      <div key={i} className="avatar">
                        <img src={assign.avatar} alt={assign.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}

          {/*  <li
            className="list-group-item"
            data-toggle="modal"
            data-target="#infoModal"
            style={{ cursor: "pointer" }}
          >
            <p>Each issue has a single reporter but can have multiple assignees</p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img src="./assets/img/download (1).jfif" alt="alt" />
                  </div>
                  <div className="avatar">
                    <img src="./assets/img/download (2).jfif" alt="alt" />
                  </div>
                </div>
              </div>
            </div>
          </li> */}
          {/*  <li className="list-group-item">
            <p>Each issue has a single reporter but can have multiple assignees</p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img src="./assets/img/download (1).jfif" alt="alt" />
                  </div>
                  <div className="avatar">
                    <img src="./assets/img/download (2).jfif" alt="alt" />
                  </div>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    ));
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList(detailProject.lstTask, dispatch)}
    </div>
  );
}

export default ContentMain;

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">DONE 3</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
