import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { styles } from "../../Utils/Style";

const Login = () => {
  const onFinish = async (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout title={"Login"}>
      <div className="flex justify-center items-center min-h-[70vh] h-[95vh] bg-[#2e3239]">
        <div className="h-auto w-[40%] border bg-white text-3xl text-center mt-5">
          Login to Your Account
          <Form
            className="p-4"
            name="basic"
            labelCol={{
              span: 4,
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
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                className="inputStyles"
                placeholder="Enter you valid mail"
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
                className="inputStyles"
                placeholder="Enter you valid password"
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
            <p className="mt-[15px] text-[12px] text-center text-slate-400">
              Do not have an account?
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
