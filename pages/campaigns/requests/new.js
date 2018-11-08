import React, { Component } from 'react';
import { Button, Form, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        errMsg:"",
        loading: false,
        description: "",
        amount: "",
        recipient: ""
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }
    
    //form submission
    onSubmit = async event => {
        event.preventDefault();
        

        const campaign = Campaign(this.props.address);
        //destructuring function properties from the state variable
        const { description, amount, recipient} =  this.state;
        console.log(recipient+"  "+description+"  "+amount);
        this.setState({ loading: true, errMsg: "" });

        try {
           const accounts = await web3.eth.getAccounts();
           await campaign.methods.createRequest(description, web3.utils.toWei(amount, "ether"), recipient)
           .send({ from: accounts[0] });
           Router.pushRoute(`/campaigns/${this.props.address}/requests`);
           
        } catch (err) {
            this.setState({ errMsg: err.message });
        }
        this.setState({ loading: false });
    };

     render() {
         return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event =>
                                this.setState({ description: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            label="ether"
                            labelPosition="right"
                            value={this.state.amount}
                            onChange={event =>
                                this.setState({ amount: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            label="address"
                            labelPosition="right"
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({ recipient: event.target.value })
                            }
                        />
                    </Form.Field>
                    <Message error header="Error" content={this.state.errMsg} />
                    <Button loading={this.state.loading} primary>Add</Button>

                </Form>
            </Layout>
            //  <h3> New Request </h3>
         );
     }
}

export default RequestNew;