import React, { useRef, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getCategory } from "redux/saga/JiraSaga/actions/actions";
import * as constants from "redux/saga/JiraSaga/actions/constName";
import { CLOSE_MODAL } from "redux/modal/modalReducer";

function UpdateProject({ project, ...props }) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { category } = useSelector((state) => state.ProjectReducer);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    getCategory(dispatch);
    return () => {};
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            className="form-control"
            name="projectName"
            onChange={handleChange}
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
            initialValue={project.description}
            init={{
              height: 300,
              width: 600,
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
            defaultValue={project.categoryId}
          >
            {category?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.projectCategoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="subbmit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

const handleForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: props.project.projectName,
      categoryId: props.project.categoryId.toString(),
      description: props.project.description,
      id: 0,
      creator: 0,
    };
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Trường này không được để trống!"),
  }),
  handleSubmit: (values, { resetForm, props }) => {
    props.dispatch({ type: CLOSE_MODAL });
    props.dispatch({
      type: constants.UPDATE_PROJECT_SAGA_API,
      payload: { projectId: props.project.id, infoUpdate: values },
    });
    // console.log(values);
    // console.log(props);
    // resetForm(true);
  },

  displayName: "Update Project Form",
})(UpdateProject);

const mapStateToProps = (state) => ({
  category: state.ProjectReducer.category,
});

export default connect(mapStateToProps, null)(handleForm);
