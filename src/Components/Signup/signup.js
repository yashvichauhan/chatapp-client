import React,{useState} from 'react';
import {connect} from 'react-redux';
import countryList from "react-select-country-list";
import { Select } from 'antd';
import  { HomeOutlined } from '@ant-design/icons';

import {Link } from 'react-router-dom';
import "antd/dist/antd.css";
import {Form, Input, Row, Col, Typography, Spin, Button, notification} from "antd";
import { CloseCircleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import * as reducerType from '../../Store/reducerType'
import * as reducerActions from '../../Store/acitons/index'

const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};

const { Title } = Typography;

function Signup(props) {
    const [ loading, setLoading ] = useState(false);
    const onFinish = (values) => {
        setLoading(true);
        console.log("Success:", values);
        const signupObj={
            name: values.name,
            email: values.email,
            password: values.password,
            countryCode: values.country
        }
        props.onAuth(signupObj,"signup")
        .then((user)=>{
            setLoading(false);
            props.onAuthState();
            localStorage.setItem('currentUser',JSON.stringify(user));
            props.history.replace('/chathome');
        })
        .catch((err)=>{
            setLoading(false);
            notification.open({
                message: 'Signup Failed',
                description: err.message,
                icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            });
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Row
            type={"flex"}
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
                    <Title>Signup</Title>
                    <Form.Item name={"name"}
                               hasFeedback
                               rules={[{ required: true, message: 'Name is required', whitespace: true }]}
                    >
                        <Input prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder={"Name"} />
                    </Form.Item>
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
                        <Input prefix={<MailOutlined className={"site-form-item-icon"} />} placeholder={"Email"} />
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
                    <Form.Item
                        name={"country"}
                        required={true}
                    >
                        <Select
                            suffixIcon={<HomeOutlined className={"site-form-item-icon"} />}
                            showSearch
                            placeholder="Select your country"
                            options={countryList().getData()}>
                        </Select>
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

}
const mapStateToProps=(state)=>{
  return{
    authState: state.user.authState,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onAuth:(email,password,authState)=>(dispatch(reducerActions.auth(email,password,authState))),
    onAuthState:()=>(dispatch({type: reducerType.INIT_AUTHSTATE}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);