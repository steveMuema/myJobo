import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/users';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Layout />);
  expect(renderedComponent.find('.users-layout').length).toBe(1);
});
