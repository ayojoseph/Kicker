import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input } from "semantic-ui-react";

class CampaignNew extends Component {
  state = {
    minimumCon: ""
  };
  render() {
    return (
      <Layout>
        <h3>Create a new Campaign</h3>
        <Form>
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
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
