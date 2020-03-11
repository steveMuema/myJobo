import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USERS_FETCH_USERS_LIST_BEGIN,
  USERS_FETCH_USERS_LIST_SUCCESS,
  USERS_FETCH_USERS_LIST_FAILURE,
  USERS_FETCH_USERS_LIST_DISMISS_ERROR,
} from '../../../../src/features/users/redux/constants';

import {
  fetchUsersList,
  dismissFetchUsersListError,
  reducer,
} from '../../../../src/features/users/redux/fetchUsersList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users/redux/fetchUsersList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchUsersList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchUsersList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_FETCH_USERS_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_FETCH_USERS_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchUsersList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchUsersList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_FETCH_USERS_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_FETCH_USERS_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchUsersListError', () => {
    const expectedAction = {
      type: USERS_FETCH_USERS_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchUsersListError()).toEqual(expectedAction);
  });

  it('handles action type USERS_FETCH_USERS_LIST_BEGIN correctly', () => {
    const prevState = { fetchUsersListPending: false };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_USERS_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUsersListPending).toBe(true);
  });

  it('handles action type USERS_FETCH_USERS_LIST_SUCCESS correctly', () => {
    const prevState = { fetchUsersListPending: true };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_USERS_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUsersListPending).toBe(false);
  });

  it('handles action type USERS_FETCH_USERS_LIST_FAILURE correctly', () => {
    const prevState = { fetchUsersListPending: true };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_USERS_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUsersListPending).toBe(false);
    expect(state.fetchUsersListError).toEqual(expect.anything());
  });

  it('handles action type USERS_FETCH_USERS_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchUsersListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_USERS_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUsersListError).toBe(null);
  });
});

