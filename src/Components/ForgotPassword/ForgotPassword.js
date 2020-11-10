import React, { useState } from 'react';
import axios from 'axios';
import "antd/dist/antd.css";
import {Form, Input, Row, Col, Typography, Spin, Button, Result} from "antd";
import {  MailOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};
const { Title } = Typography;

const ForgotPassword = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(null);

    //ON SUBMIT
    const onFinish = (values) => {
        setLoading(true);
        axios.post('http://localhost:4004/reset-password', {
            email: values.email
        }).then(res => {
            setLoading(false);
            setSuccess(true);
            console.log(res);
        }).catch(err => {
            console.log(err);
            let msg = 'something went wrong.';
            if(err.response.data.error.msg) {
                msg = err.response.data.error.msg;
            }
            setLoading(false);
            setError(msg);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    //DEFAULT PAGE CONTENT
    let pageContent = (
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
                    <Title>Forgot Password?</Title>
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
                        <Input prefix={<MailOutlined className={"site-form-item-icon"} />}
                               placeholder={"Email"}
                        />
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
                        <Link to={'/'}>Go to, Login.</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

    //SET SUCCESS PAGE
    if (success) {
        pageContent = (
            <Result
                status="success"
                title="Password Reset Link Has Been Sent!"
                subTitle="Check your email for a link to reset your password."
                extra={[
                    <Button type="primary" key="Home" onClick={() => { setSuccess(false); props.history.replace('/') }}>
                        Go To Login
                    </Button>,
                ]}
            />
        );
    }

    //SET ERROR PAGE
    if (error) {
        pageContent = (
            <Result
                status="error"
                title="Oops! Something went wrong."
                subTitle={error}
                extra={[
                    <Button type="primary" key="Home" onClick={() => setError(null)}>
                        Try Again
                    </Button>,
                ]}
            />
        );
    }
    return (
        pageContent
    );
}

export default ForgotPassword