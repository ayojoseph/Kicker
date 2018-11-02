const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
//no longer performing the compile step as it is done seperately and the json files are saved in build folder
// const { interface, bytecode } = require('./compile');
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "game saddle oyster laundry equal loop lunch allow cactus endless hover unfair",
  "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
