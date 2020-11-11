import React from "react";
import { Layout } from "antd";

import cssClasses from "./sidebar.module.css"
import UserSetting from './UserSetting/userSetting'

const SideBar = ({ menu }) => {
  return (
    <Layout.Sider
      className={cssClasses.sider__main}
      breakpoint={"lg"}
      collapsedWidth="0"
      trigger={null}
      width={350}
    >
    <UserSetting/>
    {menu}
    </Layout.Sider>
  );
};

export default SideBar;