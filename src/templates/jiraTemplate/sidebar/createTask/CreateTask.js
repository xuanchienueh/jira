import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { Field, Form, Formik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as CONST from "redux/saga/JiraSaga/actions/constName";
import debounce from "hooks/useDebounce";

let optionUser = [{ value: "chocolate", label: "Chocolate" }];
let initialValues = {
  listUserAsign: [],
  taskName: "",
  description: "",
  statusId: 1,
  originalEstimate: 0,
  timeTrackingSpent: 0,
  timeTrackingRemaining: 0,
  projectId: "",
  typeId: "",
  priorityId: "",
};
const createTaskSchema = yup.object().shape({
  taskName: yup.string().required("Task name is required"),
  description: yup.string().required("Description is required"),
  // statusId: yup.string().required("Status is required"),
  originalEstimate: yup
    .number()
    .required("Original estimate is required")
    .min(1, "Original estimate must be greater than 0"),
  timeTrackingSpent: yup
    .number()
    .required("Time tracking spent is required")
    .min(1, "Time tracking spent must be greater than 0"),
  projectId: yup.string().required("Project is required"),
  typeId: yup.string().required("Type is required"),
  priorityId: yup.string().required("Priority is required"),
  // listUserAsign: yup.array().required("User asign is required"),
});

function CreateTask() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [validateAddMember, setValidateAddMember] = useState([null]);
  const [searchUser, setSearchUser] = useState(null);
  const { allProject } = useSelector((state) => state.ProjectReducer);
  const { priorityAll, taskTypes } = useSelector((state) => state.createTaskReducer);
  const { listUser } = useSelector((state) => state.UserReducer);
  optionUser = listUser?.map((user) => ({ value: user.userId, label: user.name }));

  // console.log(priorityAll);

  //--
  useEffect(() => {
    dispatch({ type: CONST.GET_ALL_PROJECT_SAGA_API, payload: undefined });
    dispatch({ type: CONST.GET_ALL_PRIORITY_SAGA_API });
    dispatch({ type: CONST.GET_ALL_TASK_TYPE_SAGA_API });
    return () => {};
  }, []);

  //--
  useEffect(() => {
    dispatch({ type: CONST.GET_USER_SAGA_API, payload: searchUser });
    return () => {};
  }, [searchUser]);

  const handleEditorChange = (content, propsFormik) => {
    propsFormik.setFieldValue("description", content);
  };

  const handleChangeAddMember = (value, propsFormik) => {
    value = value.map((item) => item.value);
    propsFormik.setFieldValue("listUserAsign", value);
    setValidateAddMember(value);
  };

  const startSearchUser = debounce((input) => setSearchUser(input), 1000);

  const filterOptions = useCallback(({ label, value, data = "" }, input) => {
    if (input) startSearchUser(input);
    return true;
  }, []);

  //
  return (
    <div className="container create-task">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          values.timeTrackingRemaining = values.originalEstimate - values.timeTrackingSpent;
          if (validateAddMember[0] === null || values.listUserAsign.length === 0) {
            setValidateAddMember(false);
            return;
          }
          dispatch({ type: CONST.CREATE_TASK_SAGA_API, payload: values });
          console.log(values);
        }}
        validationSchema={createTaskSchema}
      >
        {({ values, errors, touched, ...props }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="">Task Name</label>
              <Field type="text" name="taskName" className="form-control" />
              {errors.taskName && touched.taskName && (
                <div className="text-danger">{errors.taskName}</div>
              )}
            </div>
            <div className="form-row">
              <div className="col">
                <label>Project</label>
                <Field
                  name="projectId"
                  component="select"
                  className="form-control"
                  value={values.projectId}
                >
                  {allProject?.map((project, i) => (
                    <option key={i} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </Field>
                {errors.projectId && touched.projectId && (
                  <div className="text-danger">{errors.projectId}</div>
                )}
              </div>

              <div className="col position-relative" style={{ zIndex: "2" }}>
                <label>Add member</label>
                <Select
                  closeMenuOnSelect={false}
                  // components={animatedComponents}
                  placeholder="Enter member's name"
                  isMulti={true}
                  defaultValue={[]}
                  options={optionUser}
                  filterOption={filterOptions}
                  isSearchable={true}
                  onBlur={() => setSearchUser(undefined)}
                  onKeyDown={(e) => console.log("onkeydown", e.target.value)}
                  name="listUserAsign"
                  onChange={(value) => handleChangeAddMember(value, props)}
                  // value={value}
                  classNamePrefix="select"
                />
                {!validateAddMember && <div className="text-danger">Member is required!</div>}
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
                  {taskTypes?.map((taskType, i) => (
                    <option key={i} value={taskType.id}>
                      {taskType.taskType}{" "}
                    </option>
                  ))}
                </Field>
                {errors.typeId && touched.typeId && (
                  <div className="text-danger">{errors.typeId}</div>
                )}
              </div>
              <div className="col">
                <label>Priority</label>
                <Field name="priorityId" as="select" className="form-control">
                  {priorityAll?.map((item) => (
                    <option key={item.priorityId} value={item.priorityId}>
                      {item.description}
                    </option>
                  ))}
                </Field>
                {errors.priorityId && touched.priorityId && (
                  <div className="text-danger">{errors.priorityId}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label>Original Estimate</label>
                <Field type="number" name="originalEstimate" min={0} className="form-control" />
                {errors.originalEstimate && touched.originalEstimate && (
                  <div className="text-danger">{errors.originalEstimate}</div>
                )}
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
                    {errors.timeTrackingSpent && touched.timeTrackingSpent && (
                      <div className="text-danger">{errors.timeTrackingSpent}</div>
                    )}
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
                onEditorChange={(value) => handleEditorChange(value, props)}
              />
              {errors.description && touched.description && (
                <div className="text-danger">{errors.description}</div>
              )}
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

/* function SelectUser() {
  return (
    <Select
      closeMenuOnSelect={false}
      // components={animatedComponents}
      placeholder="Enter member's name"
      isMulti={true}
      defaultValue={[]}
      options={optionUser}
      filterOption={filterOptions}
      isSearchable={true}
      onBlur={() => setSearchUser(undefined)}
      onKeyDown={(e) => console.log("onkeydown", e.target.value)}
      name="listUserAsign"
      onChange={(value) => handleChangeAddMember(value, props)}
      // value={value}
      classNamePrefix="select"
    />
  );
} */
