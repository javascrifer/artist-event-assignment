import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { MouseEvent } from 'react';

import { EventDate } from '../../shared/event-date.enum';
import EventFilters from './EventFilters';

configure({
  adapter: new Adapter(),
});

describe('<EventFilters />', () => {
  const handlers = {
    onClick: (event: MouseEvent<HTMLElement>) => null,
  };
  let wrapper: ShallowWrapper;
  let onClickSpy: jest.SpyInstance;

  beforeEach(() => {
    const component = (
      <EventFilters eventDate={EventDate.Upcoming} onClick={handlers.onClick} />
    );
    onClickSpy = jest.spyOn(handlers, 'onClick');
    wrapper = shallow(component);
  });

  test('should display title with text "Choose event date"', () => {
    // GIVEN
    const title = wrapper.find('.EventFiltersTitle');

    // THEN
    expect(title.contains('Choose event date')).toBeTruthy();
  });

  test('should display 3 filter buttons', () => {
    // GIVEN
    const buttons = wrapper.find('.EventFilters button');

    // THEN
    expect(buttons).toHaveLength(3);
  });

  test('should add append active class to active filter', () => {
    // GIVEN
    const button = wrapper.find('.EventFilters button.active');

    // THEN
    expect(button.key()).toBe(EventDate.Upcoming);
  });

  test('should call onClick on filter click', () => {
    // GIVEN
    const button = wrapper.find('.EventFilters button').last();
    const event = { target: { dataset: { value: button.key() } } };

    // WHEN
    button.simulate('click', event);

    // THEN
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenCalledWith(event);
  });
});
