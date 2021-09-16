import React, { useState, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import db from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import { createId } from "../../utils/createId";

const Channels = (props) => {
  const [channels, setChannels] = useState([]);
  const [channelActive, setChannelActive] = useState("");

  const [formChannels, setFormChannels] = useState({
    channelName: "",
    channelDetails: "",
    modal: false,
  });

  const dispatch = useDispatch();

  const channelsReducer = useSelector((state) => state.channel);

  useEffect(() => {
    if (channelsReducer.channels.length > 0) {
      setChannels(channelsReducer.channels);
      setChannelActive(channelsReducer.currentChannel.cId);
    }
  }, [channelsReducer]);

  const onChangeHandler = (e) => {
    setFormChannels((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const onOpenModelHandler = () => {
    setFormChannels((pre) => {
      return { ...pre, modal: true };
    });
  };

  const onCloseModelHandler = () => {
    setFormChannels((pre) => {
      return { ...pre, modal: false };
    });
  };

  const onAddChannel = async (e) => {
    e.preventDefault();
    const channel = {
      cId: createId(),
      name: formChannels.channelName,
      details: formChannels.channelDetails,
      createdBy: {
        uid: props.currentUser.uid,
        displayName: props.currentUser.displayName,
        photoURL: props.currentUser.photoURL,
      },
    };

    try {
      const listChannel = await db.fStore.collection("channels").get();
      listChannel.docs.map((doc) => {
        if (doc.data().name === channel.name) {
          channels.forEach((c) => {
            if (c.name === channel.name) {
              throw new Error("You joined this channel");
            }
          });
          channel.cId = doc.data().cId;
        }
      });
      const res = await db.fStore.collection("channels").add(channel);
      const newChannel = await db.fStore
        .collection("channels")
        .doc(res.id)
        .get();
      dispatch(
        allActions.channelAcs.addChannel({ ...newChannel.data(), id: res.id })
      );
      onCloseModelHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  const changeChannelCurrent = (id) => {
    dispatch(allActions.channelAcs.setCurrentChannel(channels[id]));
  };

  const displayChannels = () => {
    if (channels.length > 0) {
      return channels.map((channel, key) => {
        return (
          <Menu.Item
            key={key}
            onClick={() => changeChannelCurrent(key)}
            name={channel.name}
            className={channelActive === channel.cId ? "on" : "off"}
          >
            # {channel.name}
          </Menu.Item>
        );
      });
    } else {
      return <h4 style={{ color: "white", marginLeft: "10px" }}>Loading...</h4>;
    }
  };

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={onOpenModelHandler} />
        </Menu.Item>
        {/* Channels */}
        {displayChannels()}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={formChannels.modal} onClose={onCloseModelHandler}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={onChangeHandler}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={onChangeHandler}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={onAddChannel}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={onCloseModelHandler}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default Channels;
