import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xBA77b3f57B82eB1284bD9a15f10e2EFAc766AeE7"
);


export default instance;
