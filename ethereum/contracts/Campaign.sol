pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    
    function createCampaign(uint minimum) public {
        //takes in minimum sent from sender and deploys Campaign contract
        address newCampaign = new Campaign(minimum,msg.sender);
        //places address of deployed Campaign(contract) into array
        deployedCampaigns.push(newCampaign);
    }
    //function that cant be modified and returns an address array of deployed Campaigns
    function getDeployedcampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string desc;
        uint amount;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
        
    }
    
    address public manager;
    uint public minimumContrib;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    
    //restricted modifier makes sure that only the manager can call functions with this label
    modifier restricted () {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum,address creator) public {
        manager = creator;
        minimumContrib = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContrib); // makes sure the person calling the function has sent the minimum amout required
        // approvers.push(msg.sender);
        approvers[msg.sender] = true; // adds sender to mapping
        approversCount++; //keeping track of how many people have conributed to Campaign

    }
    
    function createRequest(string description, uint value, address recipient) public restricted {

        Request memory newRequest = Request ({
            desc: description,
            amount: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        
        /**Setting the request we want to work with to a local variable.
        Using "storage keyword to word with the actual request stored in memory
        rather than making a copy"**/
        
        Request storage request = requests[index];
        
        /** checks mapping to confirm that 
        this person has contributed to 
        the contract... returns true ifthey have**/
        
        require(approvers[msg.sender]); 
        
        /** checks if the sender has not 
        already sent approval 
        for this request in the array. If it is true, 
        require will return false and cancel 
        the transaction/send error **/
        
        require(!request.approvals[msg.sender]);
        
        /**Marks sender in this requests mapping true**/
        request.approvals[msg.sender] = true;
        
        /**increments request approval count**/
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        //setting local variable to given request index
        Request storage request = requests[index];
        //check to make sure the given request is not already complete
        require(!request.complete);
        //Checking to see if more than 50% of contributers approve the request
        require(request.approvalCount > (approversCount / 2));
        //sends the request recipient the money
        request.recipient.transfer(request.amount);
        
        request.complete = true;
    }
    
    
    
}