import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    //style adds jsx styling margin to the top header
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>Kicker</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>

        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
