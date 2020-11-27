import React,{useState} from 'react';

import {Modal, Row, Col, Form, Input} from 'antd';
import {MailOutlined} from "@ant-design/icons";

const CreateConnection=(props)=>{
    const [ email, setEmail ] = useState('');
    const TextArea =Input.TextArea;
    const onFinish = (values) => {
        props.handleConnectionSubmit(values);
    }
    const onFinishFailed = () => {
        console.log('failed edit profile');
    }
    return(
        <>
        <Modal
            title="Add New Connection"
            visible={props.visible}
            okButtonProps={{
                form: 'connect',
                key: 'submit',
                htmlType: 'submit'
            }}
            confirmLoading={props.connectionLoading}
            onCancel={props.handleCancel}
        >
        <Row type={"flex"} justify={"center"} align={"center"}>
          <Col span={20}>
            <Form name="connect"
                layout="vertical"
                id={"connect"}
                preserve={false}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label={"Email"}
                initialValue={email}
                name={"email"}
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Email is required to add user.'
                  }
                ]}
              >
                <Input prefix={<MailOutlined className={"site-form-item-icon"} />} placeholder={'Email id of user'} />
              </Form.Item>
              <Form.Item
                label={"Invitation Message"}
                initialValue={''}
                name={"firstmessage"}
                hasFeedback
                rules={[{
                    max:300,
                    message:"Message limit reached"
                }]}
            >
                <TextArea rows={4} />
              </Form.Item>
              </Form>
            </Col>
        </Row>
      </Modal>
      </>
    )
}
export default CreateConnection;