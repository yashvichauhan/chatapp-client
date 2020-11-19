import React from 'react';
import { Drawer, List, Avatar,Row,Col,Typography } from 'antd';
import  { UserOutlined, MailOutlined} from '@ant-design/icons';

function showProfile(props) {
    const { Title } = Typography;
    return (
      <>
        <Drawer
          width={'55vh'}
          placement="right"
          closable={false}
          onClose={props.onClose}
          visible={props.visible}
          drawerStyle={{backgroundColor:"#1a2236",color:"#e6e6e6"}}
        >
          <Row type={"flex"} justify={"center"} align={"center"}>
          <Col span={16}>
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                     <Avatar src={props.user.avatar} size={85}></Avatar>
                </Col>
              </Row>
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                  <Title level={3} style={{color:"#e6e6e6",margin:"1em"}}>{props.user.name}</Title> 
                </Col>
              </Row>
              </Col>
            </Row>
            <Row type={"flex"} align={"left"}>
            <Col>
                <Title level={5} style={{color:"#e6e6e6"}}><span style={{padding:"0 1em 0 0"}}><UserOutlined/></span>About</Title>
                <Row>
                    <p justify={"center"} style={{color:"grey"}}>
                        Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content.
                    </p>
                </Row>
            </Col>
            </Row>
            <Row type={"flex"} align={"left"}>
            <Col>
                <Title level={5} style={{color:"#e6e6e6"}}><span style={{padding:"0 1em 0 0"}}><MailOutlined/></span>Email</Title>
                <Row>
                    <p justify={"center"} style={{color:"grey"}}>
                        {props.user.email}
                    </p>
                </Row>
            </Col>
            </Row>
        </Drawer>
      </>
    );
}

export default showProfile;