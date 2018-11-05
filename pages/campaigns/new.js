import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
//link: react component that allows anchor tags rendering for navigation
//Router: allows to redirect users from one page to another in the app
import { Link, Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumCon: "",
    errMsg: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumCon).send({
        from: accounts[0]
      });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errMsg: err.message });
    }

    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
          <Form.Field>
            <label>Minimum Contribution (100 Wei)</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumCon}
              onChange={event =>
                this.setState({ minimumCon: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Error" content={this.state.errMsg} />
          <Button loading={this.state.loading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
