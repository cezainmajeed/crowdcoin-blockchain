import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x76cA304aa108114cc88F041a908eABA637e8dAf1"
);


export default instance;
