import React from 'react';
import { shallow } from 'enzyme';
import  UsersContainer  from '../../../src/features/users/UsersContainer';
// import {Provider} from 'react-redux';

describe('users/UsersContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      // <Provider store={mockStore()}>
      <UsersContainer {...props} />
      // </Provider>
    );

    expect(
      renderedComponent.find('.users-users-container').length
    ).toBe(1);
  });
});
