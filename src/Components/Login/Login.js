import React, { useState } from "react";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Typography, Spin, notification } from "antd";
import { CloseCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux"

import axiosConfig from "../../db/axiosConfig";

import * as reducerType from "../../Store/reducerType";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

function Login(props) {
  const [ loading, setLoading ] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    axiosConfig.post("user/signin", {
      email: values.email,
      password: values.password
    }).then((res)=>{
      setLoading(false);
      localStorage.setItem('currentUser',JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.jwt)
      props.onAuth(res.data.jwt, res.data.user);
      props.history.replace('/chathome')
    }).catch((err)=>{
      setLoading(false);
      //Error notification
      notification.open({
        message: 'Login Failed',
        description: err.response.data.error.msg,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      });
      console.log(err);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh"
        }}
      >
        <Col span={7}>
          <Title>Login</Title>
          <Form
            size={"large"}
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  required: "true",
                  message: "enter valid email address.",
                },
              ]}
            >
              <Input prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder={"Email"} />
            </Form.Item>
            <Form.Item
              name={"password"}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "enter your password.",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className={"site-form-item-icon"} />} placeholder={"Password"} />
            </Form.Item>
            <Form.Item>
              <Link to={'/signup'}>Don't have an account? Signup!</Link><br/>
              <Link to={'/forgotPassword'}>Forgot Passowrd?</Link>
            </Form.Item>
            <Form.Item>
              <Row>
                <Spin spinning={loading}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
                </Spin>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (token, user) =>
      dispatch({
        type: reducerType.INIT_AUTHSTATE,
        token,
        user
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
