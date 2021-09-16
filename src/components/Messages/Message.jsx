import React from "react";
import { Comment, Image } from "semantic-ui-react";

const Message = (props) => {
  const isOwnMessage = (message, user) => {
    return message.user.uid === user.uid ? "message__self" : "";
  };

  const displayMessages = () => {
    if (props.messages.messages.length > 0) {
      return props.messages.messages.map((message, key) => {
        return (
          <Comment key={key}>
            <img src={message.user.photoURL} alt="avatar" className="avatar" />
            <Comment.Content className={isOwnMessage(message, props.user.user)}>
              <div className="info">
                <Comment.Author as="a">
                  {message.user.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  {new Date(message.createdAt.nanoseconds).getHours()}h
                </Comment.Metadata>
              </div>
              {message.message && (
                <p>
                  <span className="mss" style={{ margin: "0px" }}>
                    {message.message}
                  </span>
                </p>
              )}
              {message.image && (
                <span className="image-link">
                  <p className="link">{message.user.displayName} send a link</p>
                  <div className="link-upload">
                    <a href={message.image}>
                      <img
                        src={message.image}
                        alt="upload"
                        className="upload-div"
                      />
                    </a>
                  </div>
                </span>
              )}
            </Comment.Content>
          </Comment>
        );
      });
    } else {
      return <h4>Loading...</h4>;
    }
  };

  return <React.Fragment>{displayMessages()}</React.Fragment>;
};

export default Message;
