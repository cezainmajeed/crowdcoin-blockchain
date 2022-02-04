import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

import { Form, Input, Button, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class RequestNew extends Component {
  state = {
    description:"",
    value:"",
    recipient:"",
    errorMessage:"",
    loading:false
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async(event) => {
    event.preventDefault();
    this.setState({errorMessage:"",loading:true});
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(description, web3.utils.toWei(value,"ether") , recipient).send({
        from :accounts[0]
      });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  };

  render() {
    return (
      <Layout>
      <Link route={`/campaigns/${this.props.address}/requests`}>
      <a>
      View Requests
      </a>
      </Link>

      <h1>Create a Request!</h1>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Description</label>
        <Input
          value={this.state.description}
          onChange={ event => this.setState({ description:event.target.value })}
        />
      </Form.Field>

      <Form.Field>
        <label>Amount in Ether</label>
        <Input
          value={this.state.value}
          onChange={ event => this.setState({ value:event.target.value })}
        />
      </Form.Field>

      <Form.Field>
        <label>Recipient Address</label>
        <Input
          value={this.state.recipient}
          onChange={ event => this.setState({ recipient:event.target.value })}
        />
      </Form.Field>

      <Message
        error
        header="We're sorry we can't complete that transaction!"
        content={this.state.errorMessage}
      />

      <Button loading={this.state.loading} primary type='submit'>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
