import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "antd/dist/antd.css";
import {Form, Input, Row, Col, Typography, Spin, Button, notification} from "antd";
import {CloseCircleOutlined, LockOutlined} from '@ant-design/icons';

import axios from 'axios';

const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};
const { Title } = Typography;

const ResetPassword = (props) => {
  const { token } = useParams();
  const [ loading, setLoading ] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    axios.post(`http://localhost:4004/reset-password/${token}`, {
      password: values.password
    }).then(res => {
      setLoading(false);
      props.history.replace('/');
    }).catch(err => {
      setLoading(false);
      console.log(err);
      let msg = 'something went wrong.';
      if (err.response.data.error.msg) {
          msg = err.response.data.error.msg;
      }
      //Error notification
      notification.open({
          message: 'Reset Password Failed',
          description: msg,
          icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      });
    })
  };

  const onFinishFailed = (err) => {
      console.log("failed:", err);
  };

  return (
      <Row type={"flex"}
           justify={"center"}
           align={"middle"}
           style={{ minHeight: '100vh' }}
      >
          <Col span={7}>
              <Form size={"large"}
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
              >
                  <Title>Reset Password</Title>
                  <Form.Item
                      name="password"
                      rules={[
                          {
                              required: true,
                              message: 'Please input your password!',
                          },
                      ]}
                      hasFeedback
                  >
                      <Input.Password prefix={<LockOutlined className={"site-form-item-icon"} />} placeholder={"Password"} />
                  </Form.Item>
                  <Form.Item
                      name="confirm"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                          {
                              required: true,
                              message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                              validator(rule, value) {
                                  if (!value || getFieldValue('password') === value) {
                                      return Promise.resolve();
                                  }
                                  return Promise.reject('The two passwords that you entered do not match!');
                              },
                          }),
                      ]}
                  >
                      <Input.Password prefix={<LockOutlined className={"site-form-item-icon"} />} placeholder={"Confirm Password"} />
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
                  <Form.Item>
                      <Link to={'/'}>Already have an account? Login!</Link>
                  </Form.Item>
              </Form>
          </Col>
      </Row>
  );
};

export default ResetPassword;