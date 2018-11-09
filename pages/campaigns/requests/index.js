import  React, { Component } from 'react';
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
    static async getInitialProps (props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        //gets the number of requests that are in the campaign first
        const requestsCount = await campaign.methods.getRequestsCount().call();

        //loops through the requests array on the campaign and fetches each at a time
        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        console.log(requests);

        return { address, requests };
    }

    render() {
        //Used so we can map all the table properties without having to add them in the jsx
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                <h3>request index</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>

                    </a>
                </Link>
                <Table color='blue' inverted>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Desc</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>

                        
                        </Row>
                    </Header>
                </Table>
            </Layout>
        );
    }

}

export default RequestIndex;