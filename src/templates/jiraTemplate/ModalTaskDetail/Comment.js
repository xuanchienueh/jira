import React, { useState } from "react";
import { confirm } from "react-bootstrap-confirmation";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "redux/saga/JiraSaga/actions/actions";
import { INSERT_COMMENT_SAGA_API } from "redux/saga/JiraSaga/actions/constName";
import { USER_JIRA } from "utils/config";

let infoUserLogin = JSON.parse(localStorage.getItem(USER_JIRA));

function Comment({ taskDetail }) {
  const dispatch = useDispatch();
  const [valueCmt, setValueCmt] = useState("");
  const [valueEditCmt, setValueEditCmt] = useState("");
  const [isEditCmt, setIsEditCmt] = useState(null);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    let contentSubmit = { taskId: taskDetail.taskId, contentComment: valueCmt };
    dispatch({ type: INSERT_COMMENT_SAGA_API, payload: contentSubmit });
    setValueCmt("");
  };

  const deleteCmt = async (idComment) => {
    let result = await confirm("Are you really sure?");
    result && deleteComment(idComment, dispatch, taskDetail.taskId);
  };

  const handleEidtCmt = (comment) => {
    updateComment(comment.id, valueEditCmt, dispatch, taskDetail.taskId);
    setIsEditCmt(null);
  };
  // console.log(taskDetail);
  return (
    <div className="comment">
      <h6>Comment</h6>
      <div className="block-comment" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={infoUserLogin?.avatar} alt="123" />
        </div>
        <form onSubmit={handleSubmitComment} className="input-comment mb-3">
          <input
            onChange={(e) => setValueCmt(e.target.value)}
            value={valueCmt}
            type="text"
            placeholder="Add a comment ..."
          />
        </form>
      </div>
      <div className="lastest-comment">
        <div className="comment-item">
          {taskDetail?.lstComment?.map((item, index) => {
            return (
              <div key={index} className="display-comment align-items-center mt-3 d-flex">
                <div className="avatar">
                  <img src={item?.avatar} alt="123" />
                </div>
                <div style={{ width: "100%" }}>
                  {isEditCmt === item.id && item.idUser === infoUserLogin.id ? (
                    <div className="form-group mt-2">
                      <textarea
                        className="form-control mb-2"
                        rows={3}
                        defaultValue={item.commentContent}
                        onChange={(e) => setValueEditCmt(e.target.value)}
                      />
                      <button
                        onClick={() => handleEidtCmt(item)}
                        className="btn btn-success btn-sm mr-3"
                      >
                        Save
                      </button>
                      <button onClick={() => setIsEditCmt(null)} className="btn btn-danger btn-sm">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="mb-0 pl-2">{item.commentContent}</p>
                      {item.idUser === infoUserLogin?.id && (
                        <div style={{ color: "#929398" }}>
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() => setIsEditCmt(item.id)}
                          >
                            Edit
                          </button>
                          -
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() => deleteCmt(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comment;
