import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import ColorPanel from "./ColorPanel/ColorPanel.jsx";
import SidePanel from "./SidePanel/SidePanel.jsx";
import Messages from "./Messages/Messages.jsx";
import MetaPanel from "./MetaPanel/MetaPanel.jsx";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const ChatRoom = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState({ user: null });
  const channelsReducer = useSelector((state) => state.channel);
  const [currentChannel, setCurrentChannel] = useState('');

  useEffect(() => {
    if (user.currentUser) {
      setIsLoading(false);
      setCurrent({ user: user.currentUser });
    }
    if(channelsReducer.currentChannel) {
      setCurrentChannel(channelsReducer.currentChannel)
    }
  }, [user, channelsReducer]);


  return isLoading ? (
    <Spinner />
  ) : (
    <Grid
      style={{ marginTop: "0px", background: "#eee" }}
      columns="equal"
      className="app"
    >
      <ColorPanel />
      <SidePanel user={current} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages user={current} currentChannel={currentChannel} />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default ChatRoom;
