import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { Link, Router } from "../routes";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class contributeForm extends Component {
    state = {
        value: "",
        errMsg: "",
        loading: false
    };
    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        this.setState({ loading: true, errMsg: "" });
        try {
          const accounts = await web3.eth.getAccounts();
          await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value,"ether")
          });
          Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
          this.setState({ errMsg: err.message });
        }
    
        this.setState({ loading: false });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        
                    />
                </Form.Field>
                <Message error header="Error" content={this.state.errMsg} />
                <Button  loading={this.state.loading} primary>Contribute </Button>
            </Form>
        );

    }

}

export default contributeForm;