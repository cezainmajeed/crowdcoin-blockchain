import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x48C86ddF6DCd3ef5A98Fb321A4c0Cb477772161E"
);


export default instance;
