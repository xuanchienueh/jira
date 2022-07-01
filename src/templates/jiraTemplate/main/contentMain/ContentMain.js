import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactHtmlPaser from "react-html-parser";
import { useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL_SAGA_API,
  UPDATE_STATUS_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";

function ContentMain({ detailProject }) {
  // console.log(detailProject.lstTask);
  const dispatch = useDispatch();
  const [listTask, setListTask] = useState(null);
  const dataDragDrop = useRef({ taskId: 0, statusId: 0, projectId: 0 });

  let taskWillMove = null;

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    if (destination.droppableId == source.droppableId) return;
    dataDragDrop.current.statusId = destination.droppableId;
    // console.log("destination", destination);
    // console.log("source", source);
    let listTaskClone = [...detailProject.lstTask];
    listTaskClone[+source.droppableId - 1].lstTaskDeTail.splice(+source.index, 1);
    listTaskClone[+destination.droppableId - 1].lstTaskDeTail.splice(
      destination.index,
      0,
      taskWillMove
    );
    dispatch({ type: UPDATE_STATUS_SAGA_API, payload: dataDragDrop.current });
  };

  const handleDragStart = (result) => {
    // console.log("result", result);
    taskWillMove =
      detailProject.lstTask[+result.source.droppableId - 1].lstTaskDeTail[+result.source.index];
    dataDragDrop.current.taskId = Number(result.draggableId);
    dataDragDrop.current.projectId = detailProject.id;
  };

  //-----------------------------------------------------
  const renderCardTaskList = (listTasks) => {
    return listTasks?.map((task) => {
      // console.log(task);
      return (
        <Droppable key={task.statusId} droppableId={task.statusId}>
          {(provided, snapshot) => {
            // console.log(provided, snapshot);
            return (
              <div
                className="card"
                style={{ width: "13rem", height: "auto" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="card-header">{task.statusName}</div>
                <ul className="list-group list-group-flush">
                  {task.lstTaskDeTail?.map((taskDetail, i) => {
                    // console.log(taskDetail, i);
                    return (
                      <Draggable
                        key={taskDetail.taskId}
                        index={i}
                        draggableId={`${taskDetail.taskId}`}
                      >
                        {(provided, snapshot) => {
                          // console.log(provided);
                          return (
                            <li
                              className="list-group-item"
                              data-toggle="modal"
                              data-target="#infoModal"
                              style={{ cursor: "pointer" }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => {
                                dispatch({
                                  type: GET_TASK_DETAIL_SAGA_API,
                                  payload: taskDetail.taskId,
                                });
                              }}
                            >
                              <h5>{taskDetail.taskName}</h5>
                              <>{ReactHtmlPaser(taskDetail.description)}</>
                              <div className="block" style={{ display: "flex" }}>
                                <div className="block-left">
                                  <i className="fa fa-bookmark" />
                                  <span className="text-warning">
                                    {taskDetail.priorityTask.priority}
                                  </span>
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
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </ul>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      );
    });
  };
  return (
    <div className="content d-flex container justify-content-center">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {listTask ? renderCardTaskList(listTask) : renderCardTaskList(detailProject.lstTask)}
      </DragDropContext>
    </div>
  );
}

export default ContentMain;
