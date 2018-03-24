import React, { Component } from 'react'
import PropTypes from 'prop-types'

const noop = () => undefined;

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.func,
    rules: PropTypes.object,
  };

  static defaultProps = {
    children: noop,
    rules: {},
  };

  FIELD_VALIDATION_INITIAL_VALUE = { valid: true, errors: [] };

  state = {};

  constructor(props) {
    super(props);
    this.setupComponent();
  }

  setupComponent = () => {
    const { rules } = this.props;

    Object
      .keys(rules)
      .map(key => {
        this.state = {
          ...this.state,
          [key]: this.FIELD_VALIDATION_INITIAL_VALUE,
        };
      });
  }

  validate = (name, value) => {
    const rules = this.props.rules[name];

    if (typeof rules === 'undefined') return;

    let valid = true;
    let errors = []

    rules.forEach(({ errorMessage, rule }) => {
      if (rule(value)) return;
      valid = false;
      errors = [...errors, errorMessage];
    });

    this.setState({ [name]: { valid, errors }});
  }
  
  handleChange = event => {
    const { target: { name, value } } = event;

    this.validate(name, value);
    if (typeof this.props.onChange === 'function') this.props.onChange(event);
  }

  render = () => {
    const { rules, ...props } = this.props;

    return (
      <form {...props} onChange={this.handleChange}>
        {this.props.children(this.state)}
      </form>
    );
  }
}
