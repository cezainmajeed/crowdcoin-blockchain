import React, {Component} from "react";
import { Card,Button,Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {

  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns(){
    const items = this.props.campaigns.map( address =>{
      return {
        header :address,
        description :(
          <Link route={`/campaigns/${address}`}>
          <a>View Campaigns</a>
          </Link>
        ),
        fluid :true
      };
    });

    return <Card.Group items={items} /> ;
  }

  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>

        <Link route="/campaigns/new">
        <a>
        <Button floated="right" icon primary labelPosition='left'>
        <Icon name='add' />
        Create Campaign
        </Button>
        </a>
        </Link>

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
