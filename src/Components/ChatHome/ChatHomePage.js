import React, { useState } from "react";
import { Layout } from "antd";

import cssClasses from "./chathomepage.module.css";

import SideBar from "./SideBar/SideBar";
import ChatBoxMain from './Chatbox/chatBoxMain'

function ChatHomePage() {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  // const Menu = (
  //   <TopicMenu
  //     topics={topics}
  //     selectedKey={selectedKey}
  //     changeSelectedKey={changeSelectedKey}
  //   />
  // );
  return (
    <div className={cssClasses.App}>
      <Layout style={{height:'100vh'}}>
        <SideBar />
        <Layout.Content className={cssClasses.content}>
          <ChatBoxMain/>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default ChatHomePage;
