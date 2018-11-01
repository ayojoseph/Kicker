const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web = new Web3(ganache.provider());

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
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.byteCode })
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
