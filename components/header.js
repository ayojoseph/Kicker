import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, Routes } from "../routes";

export default () => {
  return (
    //style adds jsx styling margin to the top header
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">Kicker</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
