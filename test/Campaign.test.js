const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

//getting compiled contacts
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
//used to be assigned when a factory is made on network
let campaignAddress;
let campaign;

beforeEach(async () => {
  //getting list of accounts
  accounts = await web3.eth.getAccounts();
  /** deploy an instant of factory contract, uses compiled factory,
   * contract contructor part of web3.eth library and pass in compiled
   * factory abi, deploys and sends transaction to network (needs the account and gas to send) **/
  //   factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  //     .deploy({ data: compiledFactory.byteCode })
  //     .send({ from: accounts[0], gas: "1000000" });

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  //calling createCampaign fuction from the factory just created
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000"
  });
  //square brackets says wat is being returned is an array and makes the variable in it the first element
  [campaignAddress] = await factory.methods.getDeployedcampaigns().call();

  //using web3 to create a javascript representation of the contract deployed on blockchain at campaign address
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("Deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("set caller as the manager for campaign", async () => {
    //we have access to this method because the manager varible in the contract is marked as public.
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("lets people contribute money and makes them approvers", async () => {
    //contributes to the campaign
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });
    //checking to see if the address is in approvers map after contributing
    const contributer = await campaign.methods.approvers(accounts[1]).call();
    assert(contributer);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      //if this line of code runs then we know we have a problem,
      //meaning the send was approved and the minimum was not met
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("lets manager to make request", async () => {
    await campaign.methods
      .createRequest("Test", "100", accounts[2])
      .send({ from: accounts[0], gas: "1000000" });
    const request = await campaign.methods.requests(0).call();
    assert.equal("Test", request.desc);
  });

  it("processes requests", async () => {
    //contributing to the campaign
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });
    //manager account is creating a request
    await campaign.methods
      .createRequest("Test", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    //approving the request from an account other than the manager
    await campaign.methods.approveRequest("0").send({
      from: accounts[0],
      gas: "1000000"
    });
    //finalizing the request from the manager account (sending money to reciepient)
    await campaign.methods.finalizeRequest("0").send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});

// describe('Campaigns', () => {
//     it('', () => {

//     });
// });

//Test template
// describe('Campaigns', () => {
//     it('', () => {

//     });
// });
