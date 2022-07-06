import React, { useRef, useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getCategory } from "redux/saga/JiraSaga/actions/actions";
import * as CONST from "redux/saga/JiraSaga/actions/constName";
import { history } from "../../../App";
import { usePrompt } from "hooks/usePrompt";

let formIsDirty = false;

function CreateProject(props) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { category } = useSelector((state) => state.ProjectReducer);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  usePrompt("Bạn có chắc chắn chuyển trang?", formIsDirty);

  useEffect(() => {
    getCategory(dispatch);

    return () => {
      formIsDirty = false;
    };
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
    content.length > 0 ? (formIsDirty = true) : (formIsDirty = false);
  };

  return (
    <div className="container">
      <h3>Create Project</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            className="form-control"
            name="projectName"
            onChange={(event) => {
              event.target.value.length > 0 ? (formIsDirty = true) : (formIsDirty = false);
              return handleChange(event);
            }}
            onBlur={handleBlur}
            value={values.projectName}
          />
          {errors.projectName && touched.projectName && (
            <small className="form-text text-danger">{errors.projectName}</small>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="u3xtljhzp8ljxegn3mvvt90iunxghh5b3f8x7nxldti1qz81"
            initialValue="<p></p>"
            init={{
              height: 500,
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

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Project Category</label>
          <select
            className="form-control"
            name="categoryId"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {category?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.projectCategoryName}
              </option>
            ))}
          </select>
        </div>

        <button onClick={() => (formIsDirty = false)} type="submit" className="btn btn-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const handleForm = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: (props) => {
    let categoryId = props.category[0]?.id;
    return { projectName: "", categoryId, description: "" };
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Trường này không được để trống!"),
  }),
  handleSubmit: (values, { resetForm, props }) => {
    props.dispatch({ type: CONST.CREATE_PROJECT_SAGA_API, payload: values });
  },

  displayName: "Create Project Form",
})(CreateProject);

const mapStateToProps = (state) => ({
  category: state.ProjectReducer.category,
});

export default connect(mapStateToProps, null)(handleForm);
