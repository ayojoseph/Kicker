import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x350469C19c56c20718ecd8e0809F6ebC7a3d4f24"
);
export default instance;
