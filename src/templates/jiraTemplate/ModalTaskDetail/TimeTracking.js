import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_TIME_TRACKING_SAGA_API } from "redux/saga/JiraSaga/actions/constName";

function TimeTracking({ taskDetail }) {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  let timeTrackingSpent0 = taskDetail?.timeTrackingSpent;
  let timeTrackingRemaining0 = taskDetail?.timeTrackingRemaining;
  const [timeTrackingSpent, setTimeTrackingSpent] = useState(0);
  const [timeTrackingRemaining, setTimeTrackingRemaining] = useState(0);
  const handleUpdataTracking = (e) => {
    if (e.target.value < 0) {
      alert(`${e.target.name} không thể nhập số âm!`);
      return;
    }
    let submit = {
      timeTrackingSpent: timeTrackingSpent,
      originalEstimate: timeTrackingRemaining + timeTrackingSpent,
      timeTrackingRemaining: timeTrackingRemaining,
      taskId: taskDetail.taskId,
    };
    dispatch({ type: UPDATE_TIME_TRACKING_SAGA_API, payload: submit });
    setShowInput(false);
  };

  const onFocusInput = () => {
    timeTrackingRemaining == 0 && setTimeTrackingRemaining(timeTrackingRemaining0);
    timeTrackingSpent == 0 && setTimeTrackingSpent(timeTrackingSpent0);
  };

  return (
    <>
      <div className="estimate position-relative">
        <h6>TIME SPENT (HOURS)</h6>
        <input
          className="position-absolute"
          style={{
            display: showInput ? "none" : "block",
            zIndex: 3,
            left: "0px",
          }}
          onClick={() => setShowInput(true)}
          defaultValue={taskDetail.timeTrackingSpent}
        />
        <input
          type="number"
          name="timeTrackingSpent"
          defaultValue={taskDetail.timeTrackingSpent}
          onChange={(e) => setTimeTrackingSpent(Number(e.target.value))}
          onBlur={(e) => handleUpdataTracking(e)}
          onFocus={onFocusInput}
          style={{ opacity: showInput ? 1 : 0, backgroundColor: "#ccc" }}
          disabled={showInput ? false : true}
        />
      </div>
      <div className="estimate mt-3 position-relative">
        <h6>TIME REMAINING (HOURS)</h6>
        <input
          className="position-absolute"
          style={{
            display: showInput ? "none" : "block",
            zIndex: 3,
            left: "0px",
          }}
          onClick={() => setShowInput(true)}
          defaultValue={taskDetail.timeTrackingRemaining}
        />
        <input
          type="number"
          name="timeTrackingRemaining"
          defaultValue={taskDetail.timeTrackingRemaining}
          onChange={(e) => setTimeTrackingRemaining(Number(e.target.value))}
          onBlur={(e) => handleUpdataTracking(e)}
          onFocus={onFocusInput}
          style={{ opacity: showInput ? 1 : 0, backgroundColor: "#ccc" }}
          disabled={showInput ? false : true}
        />
      </div>
      <div className="time-tracking mt-3">
        <h6>TIME TRACKING</h6>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(taskDetail.timeTrackingSpent * 100) / taskDetail.originalEstimate}%`,
                }}
                aria-valuenow={taskDetail.timeTrackingSpent / taskDetail.originalEstimate}
                aria-valuemin={0}
                aria-valuemax={1}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{taskDetail.timeTrackingSpent}h logged</p>
              <p className="estimate-time">{taskDetail.timeTrackingRemaining}h estimated</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeTracking;
