import { useNavigate } from "react-router";
import Layout from "../../Component/Layout/Layout";
import { styles } from "../../Utils/Style";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiResStatus, setAlertMessages } from "../../Redux/Reducer/roomSlice";
import { useState } from "react";
import Loader from "../../Utils/loader";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number can have at most 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password can have at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    const { name, email, phoneNumber, password, address } = value;

    const bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("phone", phoneNumber);
    bodyFormData.append("address", address);
    bodyFormData.append("profile", profile);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/auth/register`,
        bodyFormData
      );
      if (res && res.data.success) {
        dispatch(setAlertMessages(res.data.message));
        dispatch(apiResStatus(true));
        navigate("/login");
      } else {
        dispatch(setAlertMessages(res.data.message));
        dispatch(apiResStatus(false));
      }
      setLoading(false);
    } catch (error) {
      dispatch(apiResStatus(false));
      dispatch(setAlertMessages(error.response.data.message));
    }
  };

  return (
    <Layout>
      {loading == true ? (
        <Loader />
      ) : (
        <div className="login_wrapper bg-slate-800 flex flex-col justify-center items-center mt-20 ">
          <div className="outer_card">
            <div className="circle"></div>
            <div className="circle"></div>
            <Formik
              initialValues={{
                name: "",
                address: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="card-inner flex flex-col justify-center items-center rounded-2xl">
                  <h1 className={`${styles.heroSubHeadText} text-slate-100`}>
                    Signup
                  </h1>

                  <label className="btn-outline-secondary col-md-12 text-white-100">
                    {profile ? (
                      profile.name
                    ) : (
                      <p className="text-center">Upload Profile Picture</p>
                    )}
                  </label>
                  <div className="flex items-center gap-x-2">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="input placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      onChange={(e) => setProfile(e.target.files[0])}
                      hidden
                    />
                    <div className="mb-3 ">
                      {profile && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(profile)}
                            alt="product_photo"
                            width={"60px"}
                            height={"60px"}
                            className="img img-responsive rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="input mt-2 text-white-100"
                  />
                  {errors.name && touched.name ? (
                    <div className=" text-red-700">{errors.name}</div>
                  ) : null}
                  <Field
                    name="address"
                    className="input mt-2 text-white-100"
                    placeholder="Address"
                  />
                  {errors.address && touched.address ? (
                    <div className=" text-red-700">{errors.address}</div>
                  ) : null}
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input mt-2 text-white-100"
                  />
                  {errors.email && touched.email ? (
                    <div className=" text-red-700">{errors.email}</div>
                  ) : null}

                  <Field
                    name="phoneNumber"
                    className="input mt-2 text-slate-100"
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div className=" text-red-700">{errors.phoneNumber}</div>
                  ) : null}
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input mt-2 text-slate-100"
                  />
                  <ErrorMessage
                    className=" text-red-700"
                    name="password"
                    component="div"
                  />
                  <label htmlFor="showPassword" className="flex">
                    <input
                      type="checkbox"
                      id="showPassword"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <p className=" text-white"> Show Password</p>
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="input mt-2 text-slate-100"
                  />
                  <ErrorMessage
                    className=" text-red-700"
                    name="confirmPassword"
                    component="div"
                  />
                  <button className="btn mt-2 !w-[60%] mb-4" type="submit">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Register;
