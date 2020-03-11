import React from 'react';
import { shallow } from 'enzyme';
import { TopBar } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TopBar />);
  expect(renderedComponent.find('.home-top-bar').length).toBe(1);
});
