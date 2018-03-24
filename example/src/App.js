import React, { Component } from 'react'
import { isEmail } from 'validator';
import Form from 'react-render-props-form-validation'

export default class App extends Component {
  state = { email: 'my@example.com' };

  rules = {
    email: [
      { message: 'Invalid e-mail.', rule: isEmail },
    ],
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });
  
  render () {
    return (
      <Form rules={this.rules}>
        {validation => (
          <React.Fragment>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {!validation.email.valid && (
              <ul>
                {validation.email.errors.map(err => <li key={err}>{err}</li>)}
              </ul>
            )}
          </React.Fragment>
        )}
      </Form>
    )
  }
}