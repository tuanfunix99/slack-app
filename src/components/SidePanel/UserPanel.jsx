import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import db from "../../utils/firebase";

const UserPanel = (props) => {
  const onSignOut = async () => {
    db.auth.signOut();
  };

  const photoDefault = 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png'

  const dropdownOptions = () => {
    return [
      {
        key: "user",
        text: (
          <span>
            Signed in as <strong></strong>
          </span>
        ),
        disabled: true,
      },
      {
        key: "avatar",
        text: <span>Change Avatar</span>,
      },
      {
        key: "signout",
        text: <span onClick={onSignOut}>Sign Out</span>,
      },
    ];
  };

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>RoomChat</Header.Content>
          </Header>
        </Grid.Row>

        {/* User Dropdown  */}
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image src={props.currentUser ? props.currentUser.photoURL : photoDefault} spaced="right" avatar />
                {props.currentUser ? props.currentUser.displayName : "User"}
              </span>
            }
            options={dropdownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
