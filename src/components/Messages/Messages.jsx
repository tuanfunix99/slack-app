import React, { useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import allActions from "../../actions/allActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import './Messages.css'

const Messages = (props) => {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.messageAcs.loadMessage(props.currentChannel.cId));
  }, [dispatch, props.currentChannel]);



  return (
    <React.Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          <Message messages={messages} user={props.user} />
        </Comment.Group>
      </Segment>

      <MessageForm user={props.user} currentChannel={props.currentChannel} />
    </React.Fragment>
  );
};

export default Messages;
