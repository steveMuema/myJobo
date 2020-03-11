import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  USERS_FETCH_USERS_LIST_BEGIN,
  USERS_FETCH_USERS_LIST_SUCCESS,
  USERS_FETCH_USERS_LIST_FAILURE,
  USERS_FETCH_USERS_LIST_DISMISS_ERROR,
} from './constants';
import Axios from 'axios';
 
export function fetchUsersList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: USERS_FETCH_USERS_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = Axios.get('https://ti-react-test.herokuapp.com/users')
      doRequest.then(
        (res) => {
          dispatch({
            type: USERS_FETCH_USERS_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: USERS_FETCH_USERS_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchUsersListError() {
  return {
    type: USERS_FETCH_USERS_LIST_DISMISS_ERROR,
  };
}

export function useFetchUsersList() {
  const dispatch = useDispatch();

  const { usersList, fetchUsersListPending, fetchUsersListError } = useSelector(
    state => ({
      usersList: state.users.usersList,
      fetchUsersListPending: state.users.fetchUsersListPending,
      fetchUsersListError: state.users.fetchUsersListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchUsersList(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchUsersListError());
  }, [dispatch]);

  return {
    usersList,
    fetchUsersList: boundAction,
    fetchUsersListPending,
    fetchUsersListError,
    dismissFetchUsersListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USERS_FETCH_USERS_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchUsersListPending: true,
        fetchUsersListError: null,
      };

    case USERS_FETCH_USERS_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        usersList: action.data, 
        fetchUsersListPending: false,
        fetchUsersListError: null,
      };

    case USERS_FETCH_USERS_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchUsersListPending: false,
        fetchUsersListError: action.data.error,
      };

    case USERS_FETCH_USERS_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchUsersListError: null,
      };

    default:
      return state;
  }
}
