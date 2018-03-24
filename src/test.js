import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { render, shallow } from 'enzyme';
import React from 'react';

import Form from './'

Enzyme.configure({ adapter: new Adapter() });

describe('<Form />', () => {
  it('Is truthy', () => {
    expect(Form).toBeTruthy();
  });

  it('Render without crash', () => {
    render(<Form />);
  });

  it('Invoke the children function', () => {
    const child = jest.fn();
    render(<Form>{child}</Form>);

    expect(child).toBeCalled();
  });

  it('Should be rendered with default state', () => {
    const child = jest.fn();
    const rules = {
      name: [
        { errorMessage: 'required', rule: value => value !== '' }
      ],
    };

    render(<Form rules={rules}>{child}</Form>);
    expect(child).toBeCalledWith({
      name: { valid: true, errors: [] },
    });
  });

  it('Should validate rules', () => {
    const rules = {
      name: [
        { errorMessage: 'required', rule: value => value !== '' }
      ],
    };

    const wrapper = shallow(
      <Form rules={rules}>
        {validation => (
          <input name="name" value={'nathan'} />
        )}
      </Form>
    );

    const form = wrapper.find('form');

    form.simulate('change', { target: { name: 'name', value: '' } });
    expect(wrapper.state()).toEqual({ name: { valid: false, errors: ['required'] } });
    
    form.simulate('change', { target: { name: 'name', value: 'ok' } });
    expect(wrapper.state()).toEqual({ name: { valid: true, errors: [] } });
  });
})
