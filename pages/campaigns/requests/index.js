import React, { Component } from "react";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/reqrow";

import { Button, Table, Label } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    //gets the number of requests that are in the campaign first
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    //loops through the requests array on the campaign and fetches each at a time
    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    // console.log(requests);

    return { address, requests, requestsCount, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          approversCount={this.props.approversCount}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    //Used so we can map all the table properties without having to add them in the jsx
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h2>Campaign Requests</h2>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table color="grey" inverted>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ETH)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <h3>Found {this.props.requestsCount} request(s)</h3>
      </Layout>
    );
  }
}

export default RequestIndex;
