import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Link, MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from './Nav';

configure({
  adapter: new Adapter(),
});

describe('<Nav />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const component = (
      <MemoryRouter>
        <Nav />
        <Switch>
          <Route path="/" exact={true} render={() => <p>root</p>} />
          <Route path="/foo" render={() => <h6>foo</h6>} />
          <Redirect to="/foo" />
        </Switch>
      </MemoryRouter>
    );

    wrapper = mount(component);
  });

  test('should render application name', () => {
    // GIVEN
    const expectedAppName = 'Artist events assignment';

    // THEN
    expect(wrapper.find('span').contains(expectedAppName)).toBeTruthy();
  });

  test('should redirect to root on link click', () => {
    // GIVEN
    const link = wrapper.find(Link);

    // WHEN
    link.simulate('click');

    // THEN
    const route = wrapper.find('p');

    expect(route).toHaveLength(1);
    expect(route.contains('root')).toBeTruthy();
  });
});
