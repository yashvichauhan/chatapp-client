import React ,{useState} from 'react';
import {Modal, Button, Row, Col, Form, message,Checkbox} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';

import cssClasses from './forwardMessage.module.css';
import { Hidden } from '@material-ui/core';

function ForwardMessage(props){
    const [checkValues, setcheckValues] = useState([]);
    const [modalOK, setmodalOK] = useState(true);
    const onFinish = (values) => {
        if(values.checkboxes.length<4){
            props.handleSubmit(values);
        }else{
            message.error(`You can forward only upto 3 connections!`);
        }
    }
    const onFinishFailed = () => {
        console.log('failed forward message.');
    }
    const CheckBoxChange=(valueArr)=>{
        if(valueArr.length===0){
            setmodalOK(true)
        }else{
            setmodalOK(false)
        }
        setcheckValues(valueArr);
    }
    return (
        <>
        <Modal
            title="Forward Message"
            visible={props.visible}
            okButtonProps={{
                form: props.formName,
                key: 'submit',
                htmlType: 'submit',
                disabled: modalOK
            }}
            width="300pt"
            confirmLoading={props.forwardLoading}
            onCancel={props.handleCancel}
        >
        <Row type={"flex"} justify={"center"} align={"center"}>
            <Col span={24}>
                <Form name={props.formName}
                    id={props.formName}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                <Row type={"flex"} justify={"center"} align={"center"}>
                    <Col span={24}>
                        <div className={cssClasses.forwardMessage__box}>
                        <Form.Item
                            initialValue={[]}
                            name={"checkboxes"}
                        >
                        <Checkbox.Group style={{ width: '100%' }} onChange={CheckBoxChange}>
                            {Object.values(props.userList).map((val)=>(
                                <Row key={val.userID}>
                                    <Col span={24}>
                                    <Row className={cssClasses.forwardMessage__user}>
                                        <Col span={2} justify="center" align="center">
                                            <Checkbox value={val.gID}></Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Avatar key={val.userID} style={{height:"32pt",width:"32pt"}} alt={val.name} src={val.avatar}></Avatar>
                                        </Col>
                                        <Col span={18}>
                                            <div>
                                            {val.name}
                                            </div>
                                            <div className={cssClasses.forwardMessage__aboutme}>
                                                {val.aboutme}
                                            </div>
                                        </Col>
                                    </Row >
                                    </Col>
                                </Row>
                            ))}
                        </Checkbox.Group>
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#E8E8E8",overflow:Hidden}}>
                    <Col span={2}>
                        <span><RightOutlined style={{fontSize:"1.4em"}}/></span>
                    </Col>
                    <Col span={22}>
                        <Row>
                            {checkValues.map((item)=>(
                                <div key={props.userList[item].userID} className={cssClasses.forwardMessage__selected}>{props.userList[item].name}</div>
                            ))}
                        </Row>
                    </Col>
                </Row>
              </Form>
            </Col>
        </Row>
        </Modal>
        </>
    )
}

export default ForwardMessage;