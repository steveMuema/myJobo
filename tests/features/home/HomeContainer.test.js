import React from 'react';
import { shallow } from 'enzyme';
import { HomeContainer } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<HomeContainer />);
  expect(renderedComponent.find('.home-home-container').length).toBe(1);
});
