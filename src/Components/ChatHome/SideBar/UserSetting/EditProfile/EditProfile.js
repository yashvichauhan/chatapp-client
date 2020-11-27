import React, {useState} from "react";

import {Modal, Button, Row, Col, Form, Input, Avatar, Upload, message} from 'antd';
import {MailOutlined, UploadOutlined, UserOutlined,SmileOutlined } from "@ant-design/icons";

const EditProfile = (props) => {
  const [ file, setFile ] = useState(null);
  const [ prevURL, setPrevURL ] = useState(props.userData.avatar);
  const [ name, setName ] = useState(props.userData.name);
  const [ email, setEmail ] = useState(props.userData.email);
  const [aboutme,setAboutMe] = useState(props.userData.aboutme);

  const onFinish = (values) => {
    props.handleSubmit(values, file);
  }

  const onFinishFailed = () => {
    console.log('failed edit profile');
  }

  const handleFileChange = ({ fileList }) => {
    if(fileList[fileList.length -1] && fileList[fileList.length -1].originFileObj) {
      const fileType = fileList[fileList.length-1].type;
      const fileSize = fileList[fileList.length-1].size / 1024 / 1024 < 1;
      if((fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') && fileSize) {
        const file = fileList[fileList.length-1].originFileObj;
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPrevURL(reader.result);
        };
        setFile(fileList[fileList.length-1].originFileObj);
      }
    }else {
      setFile(null);
    }
  };

  const beforeUpload = (file) => {
    if(file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
      message.error(`${file.name} file type is not supported.`);
    }
    const isLimit1MB = file.size / 1024 / 1024 < 1;
    if (!isLimit1MB) {
      message.error('Image must smaller than 1MB');
    }
    return false;
  };

  return (
    <>
      <Modal
        title="Edit Profile"
        visible={props.visible}
        okButtonProps={{
          form: 'basic',
          key: 'submit',
          htmlType: 'submit'
        }}
        confirmLoading={props.editLoading}
        onCancel={props.handleCancel}
      >
        <Row type={"flex"} justify={"center"} align={"center"}>
          <Col span={16}>
            <Form name="basic"
                  id={"basic"}
                  preserve={false}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
            >
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                  <Form.Item>
                    <Avatar src={prevURL} size={85}></Avatar>
                  </Form.Item>
                </Col>
              </Row>
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                  <Form.Item>
                    <Upload
                      showUploadList={false}
                      name={"avatar"}
                      accept={'.jpg, .jpeg, .png'}
                      beforeUpload={beforeUpload}
                      onChange={handleFileChange}
                    >
                      <Button type={"primary"} size={"middle"} shape={"round"} icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                initialValue={name}
                name={"name"}
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Name is required.'
                  }
                ]}
              >
                <Input prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder={'Name'} />
              </Form.Item>
              <Form.Item
                initialValue={aboutme}
                name={"aboutme"}
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Can\'t set empty about me.' 
                  }
                ]}
              >
                <Input prefix={<SmileOutlined className={"site-form-item-icon"} />} maxLength={100} placeholder={'About Me'} />
              </Form.Item>
              <Form.Item
                initialValue={email}
                name={"email"}
                hasFeedback
                rules={[{
                  type: 'email',
                  required: true,
                  message: 'Email is required.'
                }]}
              >
                <Input prefix={<MailOutlined className={"site-form-item-icon"} />}  placeholder={"Email"} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EditProfile;