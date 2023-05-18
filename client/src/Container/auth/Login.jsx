import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { styles } from "../../Utils/Style";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiResStatus, setAlertMessages } from "../../Redux/Reducer/roomSlice";
import { assignUserRole, setLoginDetails } from "../../Redux/Reducer/userSlice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const { email, password } = values
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_URL}/api/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        const { token } = res.data;
        console.log(res.data)
        // Set the authorization header for subsequent requests
        axios.defaults.headers.common["Authorization"] = token
        dispatch(assignUserRole('user'))
        dispatch(setLoginDetails({ id: res.data.user._id, token: res.data.token }))
        dispatch(setAlertMessages(res.data.message))
        dispatch(apiResStatus(true))
        localStorage.setItem("token", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        dispatch(setAlertMessages(res.data.message))
        dispatch(apiResStatus(false))
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        dispatch(setAlertMessages(error.response.data.message));
      } else {
        dispatch(setAlertMessages('An error occurred.'));
      }
      dispatch(apiResStatus(false));
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
      <div className="flex justify-center items-center h-[100vh] bg-slate-800  ">
        <div className="border flex-wrap h-auto min-w-[300px] p-10 rounded-2xl">

          <p className={`${styles.sectionHeadText} ${styles.paddingX}`}> Room Finder </p>
          <p className={`${styles.sectionSubText} ${styles.paddingX}`}>Login your account</p>
          <Form
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,

            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="input placeholder:text-slate-400"
                placeholder="Enter your valid email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                className="input placeholder:text-slate-400"
                placeholder="Enter your valid password"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 16,
              }}
            >
              <button className="btn" type="submit">
                Submit
              </button>
            </Form.Item>
            <p className="mt-[15px] text-[20px] text-center text-slate-400">
              Do not have an account? {" "}
              <Link to="/registration" className="font-bold">
                Register
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
