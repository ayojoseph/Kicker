import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contribForm";
import { Button, Form, Input, Card, Grid, GridColumn } from "semantic-ui-react";
import { Link, Router } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    // console.log(summary);
    return {
      address: props.query.address,
      minimumContrib: summary[0],
      balance: summary[1],
      requests: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }
  renderCards() {
    const {
      minimumContrib,
      balance,
      requests,
      approversCount,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The Manager that created this campaign, can create requests and finalize requests for withdraws.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContrib,
        meta: "Minimum Contribution (Wei)",
        description: "Must contribute this amount to become an approver",
        style: { overflowWrap: "break-word" }
      },
      {
        header: requests,
        meta: "Number of Requests",
        description:
          "A request is made by the manager to withdraw money from the campaign. These requests must be approved by approvers.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people that have contributed to this campaign and can approve requests.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ETH)",
        description: "This is how much money is avaialble in the campaign. ",
        style: { overflowWrap: "break-word" }
      }
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <h2>Campaign Info</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width="10">{this.renderCards()}</Grid.Column>
            <Grid.Column width="6">
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
