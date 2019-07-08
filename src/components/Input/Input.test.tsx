import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { ChangeEvent } from 'react';

import Input from './Input';

configure({
  adapter: new Adapter(),
});

describe('<Input />', () => {
  const handlers = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => null,
  };
  let wrapper: ShallowWrapper;
  let onChangeSpy: jest.SpyInstance;

  beforeEach(() => {
    const component = (
      <Input
        placeholder="Placeholder"
        value="Value"
        onChange={handlers.onChange}
      />
    );
    onChangeSpy = jest.spyOn(handlers, 'onChange');
    wrapper = shallow(component);
  });

  test('should place placeholder into input', () => {
    // GIVEN
    const input = wrapper.find('input');

    // THEN
    expect(input.prop('placeholder')).toBe('Placeholder');
  });

  test('should place value into input', () => {
    // GIVEN
    const input = wrapper.find('input');

    // THEN
    expect(input.prop('value')).toBe('Value');
  });

  test('should call onChange on input change', () => {
    // GIVEN
    const input = wrapper.find('input');
    const event = {
      target: { value: 'Hello' },
    };

    // WHEN
    input.simulate('change', event);

    // THEN
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(event);
  });
});
