import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Button, Icon } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
function Navbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu" style={{ zIndex: 5, width: "100%" }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          {/* <Icon type="align-right" /> */}
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          maskClosable={false}
          destroyOnClose={onClose}
          open={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
