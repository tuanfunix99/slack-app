import React from "react";
import UserPanel from "./UserPanel.jsx";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels.jsx";
import './SidePanel.css'

const SidePanel = (props) => {

  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
    >
      <UserPanel currentUser={props.user.user} />
      <Channels currentUser={props.user.user}/>
    </Menu>
  );
};

export default SidePanel;
