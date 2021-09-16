import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import db from "../../utils/firebase";
import allActions from "../../actions/allActions";
import { useDispatch } from "react-redux";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";
const { v4: uuidv4 } = require("uuid");

const MessageForm = (props) => {
  const [messages, setMessages] = useState("");
  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadState, setUploadState] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const onChangeHandler = (e) => {
    setMessages(e.target.value);
  };

  const onSendMessage = async (e) => {
    e.preventDefault();
    const message = messages;
    setMessages("");
    if (props.currentChannel && props.user) {
      try {
        const res = await db.fStore.collection("messages").add({
          createdAt: db.timestamp,
          message: message,
          channelId: props.currentChannel.cId,
          user: props.user.user,
        });
        const resMessage = await db.fStore
          .collection("messages")
          .doc(res.id)
          .get();
        dispatch(
          allActions.messageAcs.addMessage({ ...resMessage.data(), id: res.id })
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const onSendUploadFile = async (link) => {
    if (props.currentChannel && props.user) {
      try {
        const res = await db.fStore.collection("messages").add({
          createdAt: db.timestamp,
          image: link,
          channelId: props.currentChannel.cId,
          user: props.user.user,
        });
        const resMessage = await db.fStore
          .collection("messages")
          .doc(res.id)
          .get();
        dispatch(
          allActions.messageAcs.addMessage({ ...resMessage.data(), id: res.id })
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const onUploadFile = async (file) => {
    const uploadTask = db.storage
      .ref()
      .child(`/images/message/${uuidv4()}`)
      .put(file);
    uploadTask.on(
      db.firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setUploadState(true);
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
        console.log(percent);
      },
      (error) => {
        setProgress(0);
      },
      async (complete) => {
        const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
        onSendUploadFile(downloadUrl).then((res) => {
          setUploadState(false);
          setProgress(0);
        });
      }
    );
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Write your message"
        onChange={onChangeHandler}
        value={messages}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          onClick={onSendMessage}
        />
        <Button
          onClick={openModal}
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
        <FileModal
          modal={modal}
          closeModal={closeModal}
          onUploadFile={onUploadFile}
        />
      </Button.Group>
      <ProgressBar progress={progress} uploadState={uploadState} />
    </Segment>
  );
};

export default MessageForm;
