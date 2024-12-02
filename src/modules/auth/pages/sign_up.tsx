import { Button, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { NavLink } from "react-router-dom";
import { useSignUpMutation } from "../hooks/mutations";
import AuthImage from "../../../assets/auth.svg";
import { SignUpValues } from "../types";
import "./style.scss";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useSignUpMutation();
  const validatePhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue.length === 12;
  };
  const onFinish = (values: SignUpValues) => {
    values = { ...values, phone_number: values.phone_number.split(" ").join("") };
    mutate(values);
    console.log(values);
  };
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <div className="center bg">
        <img src={AuthImage} alt="auth image" />
      </div>
      <div className="center">
        <Form onFinish={onFinish} form={form} layout="vertical" style={{ width: "400px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "600", marginBottom: "15px" }}>Registrate</h1>
          <Form.Item label="First name" name="first_name" rules={[{ required: true, message: "You have not entered a first name" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Last name" name="last_name" rules={[{ required: true, message: "You have not entered a last name" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              { required: true, message: "Enter password" },
              {
                validator: (_, value) => {
                  if (!value || validatePhoneNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Phone number must be +998 followed by 9 digits");
                },
              },
            ]}
          >
            <MaskedInput size="large" mask="+998 00 000 00 00" placeholder="+998 xx xxx xx xx" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "You have not entered a email" },
              { type: "email", message: "You have not entered an email!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "You have not entered a password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <Button loading={isPending} style={{ width: "100%" }} type="primary" size="large" htmlType="submit">
              Sign In
            </Button>
            <p className="registr">
              <span>Don’t you have an account?</span>
              <NavLink to="/sign-in">Registrate</NavLink>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
