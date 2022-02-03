import React,{ Component } from "react";
import { Button, Form, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class ContributeForm extends Component {
  render(){
    return (
      <Form>
      <Form.Field>
      <label>Amount to Contribute</label>
      <Input
        label="ether"
        labelPosition='right'
        placeholder='Enter Amount'
      />
      </Form.Field>
      <Button primary>
      Contribute!
      </Button>
      </Form>
    );
  }
}

export default ContributeForm;
