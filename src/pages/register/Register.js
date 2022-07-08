import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REGISTER_SAGA_API } from "redux/saga/JiraSaga/actions/constName";

const regexPhoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const regexName =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;

function Register() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      dispatch({ type: REGISTER_SAGA_API, infoRegister: values });
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      name: Yup.string()
        .test({
          name: "validateName",
          message: "**Name is invalid!",
          test: (value) => regexName.test(value),
        })
        .required("Name is required"),
      phoneNumber: Yup.string()
        .test({
          name: "validatePhoneNumber",
          message: "**Phone number is invalid!",
          test: (value) => regexPhoneNumber.test(value),
        })
        .required("Phone number is required"),
    }),
  });

  return (
    <div className="p-5 container">
      <div className="card mx-auto">
        <h1 className="card-header text-center">Register JARA</h1>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.email}
              />
              {formik.errors.email && formik.touched.email && (
                <small id="emailHelp" className="form-text text-danger">
                  {formik.errors.email}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.password}
                name="password"
              />
              {formik.errors.password && formik.touched.password && (
                <small id="emailHelp" className="form-text text-danger">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.name}
                name="name"
              />
              {formik.errors.name && formik.touched.name && (
                <small id="emailHelp" className="form-text text-danger">
                  {formik.errors.name}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.phoneNumber}
                name="phoneNumber"
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <small id="emailHelp" className="form-text text-danger">
                  {formik.errors.phoneNumber}
                </small>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
