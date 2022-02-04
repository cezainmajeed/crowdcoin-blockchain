import React , { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

import { Card, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    const address = props.query.address;
    //console.log(address);
    return {
      address:address,
      minimumContribution:summary[0],
      balance:summary[1],
      requestsCount:summary[2],
      approversCount:summary[3],
      manager:summary[4]
    };
  }

  renderCards() {
    const {
      address,
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

    return <Card.Group items={items} /> ;
  }

  render(){
    const {
      address
    } = this.props;

    return(
      <Layout>
      <h1>Campaign Details</h1>
      <Grid>
      <Grid.Column width={10}>
      {this.renderCards()}
      </Grid.Column>
      <Grid.Column width={6}>
      <ContributeForm address = {address} />
      </Grid.Column>
      </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
