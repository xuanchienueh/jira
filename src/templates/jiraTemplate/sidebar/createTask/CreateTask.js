import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { Field, Form, Formik } from "formik";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as CONST from "redux/saga/JiraSaga/actions/constName";
import debounce from "hooks/useDebounce";

let options = [{ value: "chocolate", label: "Chocolate" }];

function CreateTask() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [timeTracking, setTimeTracking] = useState({ originalEstimate: 0, timeTrackingSpent: 0 });
  const [searchUser, setSearchUser] = useState(null);
  const { allProject } = useSelector((state) => state.ProjectReducer);
  const { priority } = useSelector((state) => state.createTaskReducer);
  const { listUser } = useSelector((state) => state.UserReducer);
  options = listUser?.map((user) => ({ value: user.userId, label: user.name }));

  // console.log(listUser);

  //--
  useEffect(() => {
    dispatch({ type: CONST.GET_ALL_PROJECT_SAGA_API, payload: undefined });
    dispatch({ type: CONST.GET_ALL_PRIORITY_SAGA_API });

    return () => {};
  }, []);
  useEffect(() => {
    dispatch({ type: CONST.GET_USER_SAGA_API, payload: searchUser });

    return () => {};
  }, [searchUser]);

  const handleEditorChange = (content, editor) => {
    console.log(content);
  };

  const handleChangeAddMember = (value) => {
    console.log(value);
  };
  const startSearchUser = debounce((input) => {
    setSearchUser(input);
  }, 1000);
  const filterOptions = useCallback(({ label, value, data = "" }, input) => {
    if (input) startSearchUser(input);
    return true;
  }, []);

  //
  console.log("cpm");
  return (
    <div className="container create-task">
      <Formik
        initialValues={{
          projectId: [],
          typeId: "",
          priority: "",
          originalEstimate: 0,
          timeTrackingSpent: 0,
          timeTrackingRemaining: 0,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-row">
              <div className="col">
                <label>Project</label>
                <Field
                  name="projectId"
                  component="select"
                  className="form-control"
                  // value={values.projectId}
                >
                  <option value="New1">New task</option>
                  <option value="New2">New k</option>
                </Field>
              </div>

              <div className="col position-relative" style={{ zIndex: "2" }}>
                <label>Add member</label>
                <Select
                  closeMenuOnSelect={false}
                  // components={animatedComponents}
                  placeholder="Enter member's name"
                  isMulti={true}
                  defaultValue={[]}
                  options={options}
                  filterOption={filterOptions}
                  isSearchable
                  name="listUserAsign"
                  onChange={handleChangeAddMember}
                  // value={value}
                  classNamePrefix="select"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label>Task type</label>
                <Field
                  name="typeId"
                  component="select"
                  className="form-control"
                  // value={values.typeId}
                >
                  <option value="1">New tas1</option>
                  <option value="2">New task2</option>
                  <option value="3">New task3</option>
                </Field>
              </div>
              <div className="col">
                <label>Priority</label>
                <Field name="priority" as="select" className="form-control">
                  {priority?.map((item) => (
                    <option key={item.priorityId} value={item.priorityId}>
                      {item.description}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label>Original Estimate</label>
                <Field type="number" name="originalEstimate" min={0} className="form-control" />
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="">Time spent(hours)</label>
                    <Field
                      type="number"
                      min={0}
                      name="timeTrackingSpent"
                      className="form-control"
                      placeholder="hours"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="">Time remaining(hours)</label>
                    <input
                      value={values.originalEstimate - values.timeTrackingSpent}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="">Time tracking</label>
              <ProgressBar>
                <ProgressBar
                  label={`${values.timeTrackingSpent} hour(s) spent`}
                  striped
                  variant="success"
                  now={(values.timeTrackingSpent * 100) / values.originalEstimate}
                  key={1}
                />
                <ProgressBar
                  striped
                  now={100 - (values.timeTrackingSpent * 100) / values.originalEstimate}
                  variant="danger"
                  label={`${values.originalEstimate - values.timeTrackingSpent} hour(s) remaining`}
                  key={2}
                />
              </ProgressBar>
            </div>

            <div className="form-group">
              <label>Description</label>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey="u3xtljhzp8ljxegn3mvvt90iunxghh5b3f8x7nxldti1qz81"
                initialValue="<p></p>"
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
                onEditorChange={handleEditorChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTask;

function selecMuti() {
  return (
    <div className="dropdown">
      <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
        Project
      </button>

      <div className="dropdown-menu" role="group">
        <label className="dropdown-item">
          <Field type="checkbox" name="projectId" value="One" />
          One
        </label>
        <label className="dropdown-item">
          <Field type="checkbox" name="projectId" value="Two" />
          Two
        </label>
        <label className="dropdown-item">
          <Field type="checkbox" name="projectId" value="Three" />
          Three
        </label>
      </div>
    </div>
  );
}
