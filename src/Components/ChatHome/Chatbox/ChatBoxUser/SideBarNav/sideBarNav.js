import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import cssClasses from './sidebarnav.module.css'

const SideBarNav = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{display:'inline-block'}}>
      <Button
        className={cssClasses.menu}
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
    </div>
  );
};
export default SideBarNav;