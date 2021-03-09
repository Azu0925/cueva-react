import {createSelector} from 'reselect';

const requestErrorSelector = state => state;

export const getRequestError = createSelector(
    [requestErrorSelector],
    state => state.requestError
)
