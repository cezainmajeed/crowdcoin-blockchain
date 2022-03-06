import React,{ Component } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

import { Button, Form, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CampaignNew extends Component {
  state ={
    campaignDescription : "",
    minimumContribution :"",
    errorMessage:"",
    loading:false
  };

  onSubmit = async(event) => {
    event.preventDefault();
    this.setState({errorMessage:"",loading:true});
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution,this.state.campaignDescription)
        .send({
          from:accounts[0]
        });

      Router.pushRoute("/");
    } catch(err) {
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  };

  render(){
    return (
      <Layout>
      <h1>Create a Campaign!</h1>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

        <Form.TextArea
          label='Description'
          placeholder='Tell us more about your project...'
          value={this.state.campaignDescription}
          onChange = {event=> this.setState({campaignDescription : event.target.value})}
        />

        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition='right'
            placeholder='Enter Amount'
            value={this.state.minimumContribution}
            onChange = {event=> this.setState({minimumContribution : event.target.value})}
          />
        </Form.Field>

        <Message
          error
          header="We're sorry we can't complete that transaction!"
          content={this.state.errorMessage}
        />

        <Button loading={this.state.loading} primary type='submit'>Create</Button>
      </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
