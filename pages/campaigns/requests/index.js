import React ,{ Component } from "react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";

import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class RequestIndex extends Component {
  static async getInitialProps(props){
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();

    const requests = await Promise.all(
     Array(parseInt(requestCount))
       .fill()
       .map((element, index) => {
         return campaign.methods.requests(index).call();
     }));

     //console.log(requests);

    return { address, requests, requestCount };
  }
  render(){
    return (
      <Layout>
      <h1>Requests</h1>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
      <a>
      <Button floated="right" primary>Add Request</Button>
      </a>
      </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
