import React, { useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import { EDIT_TASK, UPDATA_DESCRIPTION_SAGA_API } from "redux/saga/JiraSaga/actions/constName";
import { useDispatch } from "react-redux";

function Description({ taskDetail }) {
  const [show, setShow] = useState(false);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const log = () => {
    setShow(false);
    if (editorRef.current) {
      dispatch({
        type: UPDATA_DESCRIPTION_SAGA_API,
        payload: { taskId: taskDetail.taskId, description: editorRef.current.getContent() },
      });
    }
  };

  return (
    <div className="description">
      <p>Description:</p>
      <div style={{ display: show ? "none" : "block" }} onClick={() => setShow(true)}>
        <>{ReactHtmlParser(taskDetail.description)}</>
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
      </div>

      <div style={{ display: show ? "block" : "none" }}>
        <Editor
          apiKey="u3xtljhzp8ljxegn3mvvt90iunxghh5b3f8x7nxldti1qz81"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={taskDetail.description}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button className="btn btn-success mr-3 my-3" onClick={log}>
          Save
        </button>
        <button className="btn btn-danger my-3" onClick={() => setShow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Description;
