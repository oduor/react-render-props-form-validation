# react-render-props-form-validation

> React render props form component with validation

[![NPM](https://img.shields.io/npm/v/react-render-props-form-validation.svg)](https://www.npmjs.com/package/react-render-props-form-validation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-render-props-form-validation
```

## Usage

```jsx
import React, { Component } from 'react'
import { isEmail } from 'validator';
import Form from 'react-render-props-form-validation'

export default class App extends Component {
  state = { email: 'my@example.com' };

  rules = {
    email: [
      { errorMessage: 'Invalid e-mail.', rule: isEmail },
    ],
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleSubmit = (event, isValid, validation) => {
    if (!isValid) {
      event.preventDefault();
      return;
    }

    // Submit logic here.
  }

  render () {
    return (
      <Form rules={this.rules} onSubmit={this.handleSubmit}>
        {validation => (
          <React.Fragment>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {!validation.email.valid && (
              <ul>
                {validation.email.errors.map(err => <li key={err}>{err}</li>)}
              </ul>
            )}
            <button type="submit" disabled={!validation._isValid}>{'Submit!'}</button>
          </React.Fragment>
        )}
      </Form>
    )
  }
}
```

## License

MIT © [nathantn](https://github.com/nathantn)
