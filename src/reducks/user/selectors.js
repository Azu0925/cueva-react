import {createSelector} from 'reselect';

const userSelector = state => state;

export const getUserId = createSelector(
    [userSelector],
    state => state.user.userId
)

export const getUserName = createSelector(
    [userSelector],
    state => state.user.userName
)

export const getUserEmail = createSelector(
    [userSelector],
    state => state.user.userEmail
)

export const getBelongTeams = createSelector(
    [userSelector],
    state => state.user.belongTeams
)
