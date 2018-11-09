import React,{ Component } from "react";
import { Menu, Table, Button, TableRow } from "semantic-ui-react";
import { Link, Routes } from "../routes";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


class RequestRow extends Component {

    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });

    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });

    };


    render() {
        //destructuring for easier use
        const { Cell, Row } = Table;
        const { id, request, approversCount } = this.props;
        const ready = request.approvalCount > approversCount / 2;
        return(

            <Row disabled={request.complete} positive={ready && !request.complete}>
                <Cell>{id+1}</Cell>
                <Cell>{request.desc}</Cell>
                <Cell>{web3.utils.fromWei(request.amount,"ether")}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                
                {request.complete ? null : (
                    <Cell>
                        <Button inverted color="red" onClick={this.onApprove}>Approve</Button>
                    </Cell>
                )}
                {request.complete ? null : (
                    <Cell>
                        <Button  inverted secondary onClick={this.onFinalize}>Finalize</Button>
                    </Cell>
                )}
                
            </Row>

        );
    }
}

export default RequestRow;