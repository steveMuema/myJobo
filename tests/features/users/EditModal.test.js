import React from 'react';
import { shallow } from 'enzyme';
import { EditModal } from '../../../src/features/users/EditModal';

describe('users/EditModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditModal {...props} />
    );

    expect(
      renderedComponent.find('.users-edit-modal').length
    ).toBe(1);
  });
});
