import React , { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

import { Card, Grid, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    const address = props.query.address;
    //console.log(address);
    return {
      address:address,
      campaignDescription:summary[0],
      minimumContribution:summary[1],
      balance:summary[2],
      requestsCount:summary[3],
      approversCount:summary[4],
      manager:summary[5]
    };
  }

  renderCards() {
    const {
      address,
      campaignDescription,
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header: minimumContribution ,
        description: "You must contribute this minimum amount of wei to become an approver."
      },
      {
        header: web3.utils.fromWei(balance,"ether") ,
        description: "Total amount of Ether raised.",
        style: {overflowWrap:"break-word"}
      },
      {
        header: requestsCount ,
        description: "Number of request trying to withdraw money from this contract."
      },
      {
        header: approversCount ,
        description: "Number of people who already donated to this campaign."
      },
      {
        header: manager ,
        description: "Address of manager.",
        style: {overflowWrap:"break-word"}
      }
    ];

    return (
      <>
      <h3>{campaignDescription}</h3>
      <Card.Group items={items} />
      </>
    );
  }

  render(){
    const {
      address
    } = this.props;

    return(
      <Layout>
      <h1>Campaign Details</h1>
      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>
      {this.renderCards()}
      </Grid.Column>
      <Grid.Column width={6}>
      <ContributeForm address = {address} />
      </Grid.Column>
      </Grid.Row>

      <Grid.Row>
      <Grid.Column>
      <Link route={`/campaigns/${address}/requests`}>
      <a>
      <Button icon primary>
      View Requests
      </Button>
      </a>
      </Link>
      </Grid.Column>
      </Grid.Row>

      </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
