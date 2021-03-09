import {createSelector} from 'reselect';

const webSocketSelector = state => state;

export const getWebSocket = createSelector(
    [webSocketSelector],
    state => state.webSocketAPI
)