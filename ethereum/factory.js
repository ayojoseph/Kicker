import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x805D3b7c6739fa0d4E87B7D385fe773c752f41B4"
);
export default instance;
