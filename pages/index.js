import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

//getInitialProps, exclusive to NextJS to do initial server side/ or data loading on the server
class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedcampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
    // return
  }

  render() {
    // return <div>{this.renderCampaigns()}</div>;
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
