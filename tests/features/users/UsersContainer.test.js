import React from 'react';
import { shallow } from 'enzyme';
import { UsersContainer } from '../../../src/features/users/UsersContainer';

describe('users/UsersContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UsersContainer {...props} />
    );

    expect(
      renderedComponent.find('.users-users-container').length
    ).toBe(1);
  });
});
