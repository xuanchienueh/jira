import React, { useRef, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getCategory } from "redux/saga/JiraSaga/actions/actions";
import * as CONST from "redux/saga/JiraSaga/actions/constName";

function CreateProject(props) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { category } = useSelector((state) => state.ProjectReducer);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  let createPJ = () => {
    let projectName =
      "nếu muốn xóa thì xóa cái này nè " +
      Math.floor(Math.random() * 1000) +
      Math.floor(Math.random() * 100);
    let description = "Project " + Math.floor(Math.random() * 1000);
    let categoryId = Math.floor(Math.random() * 3) + 1;
    let values = { projectName, description, categoryId };
    dispatch({ type: CONST.CREATE_PROJECT_SAGA_API, payload: values });
    return values.projectName;
  };

  useEffect(() => {
    getCategory(dispatch);
    /* let timerId = setInterval(() => {
      let kq = createPJ();
      console.log(kq);
    }, 3000);
    return () => {
      clearInterval(timerId);
    }; */
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
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

            {/* <option>4</option> */}
            {/* <option>5</option> */}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const handleForm = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: (props) => {
    // let categoryId = props.category[0]?.id;
    return { projectName: "", categoryId: "1", description: "" };
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Trường này không được để trống!"),
  }),
  handleSubmit: (values, { resetForm, props }) => {
    props.dispatch({ type: CONST.CREATE_PROJECT_SAGA_API, payload: values });
    // resetForm(true);
  },

  displayName: "Create Project Form",
})(CreateProject);

const mapStateToProps = (state) => ({
  category: state.ProjectReducer.category,
});

export default connect(mapStateToProps, null)(handleForm);
