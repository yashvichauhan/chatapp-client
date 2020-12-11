import React,{useState} from 'react';
import emailjs from 'emailjs-com';
import {connect} from 'react-redux';

import {Modal, Row, Col, Form, Input,message} from 'antd';
import {MailOutlined} from "@ant-design/icons";


const CreateConnection=(props)=>{
    const [ email, setEmail ] = useState('');
    const TextArea =Input.TextArea;
    const onFinish = (values) => {
      const msg={
        sender:props.user.name,
        email:values.email,
        firstmessage:values.firstmessage,
      }
      emailjs.send('service_82k7w2q', 'template_p673j8e', msg, 'user_FJFaFpeo31W9osDbLRD0y')
      .then((result) => {
        props.handleConnectionSubmit(values);
        console.log("Mail working fine");
      },(err) => {
        message.error(`Some problem in email please check it.`);
      });
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

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(CreateConnection);