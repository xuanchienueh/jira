import React, { Component } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { LOGIN_SAGA_API } from "redux/saga/JiraSaga/actions/constName";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được để trống!")
    .test({
      name: "validateEmail",
      message: "**Email không đúng!",
      test: (value) => regexEmail.test(value),
    }),

  password: Yup.string()
    .required("Mật khẩu không được để trống!")
    .min(2, "Mật khẩu có tối thiểu 2 ký tự")
    .max(20, "Mật khẩu có tối đa 20 ký tự"),
});

//---------
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;
    return (
      <div className="p-5 container">
        <div className="card mx-auto">
          <h1 className="card-header text-center">Login JARA</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.email}
                />
                {errors.email && touched.email && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.email}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.password}
                  name="password"
                />
                {errors.password && touched.password && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const HandleForm = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: () => LoginSchema,

  handleSubmit: (values, { props, resetForm }) => {
    props.dispatch({ type: LOGIN_SAGA_API, payload: values });
    // setSubmitting(false);
    // resetForm(true);
  },

  displayName: "Form Login",
})(Login);

export default connect()(HandleForm); /* truyền prop dispatch qua hàm connect*/
