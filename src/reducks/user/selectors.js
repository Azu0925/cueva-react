import {createSelector} from 'reselect';

const userSelector = state => state;

export const getUserId = createSelector(
    [userSelector],
    state => state.user.userId
)

export const getUserName = createSelector(
    [userSelector],
    state => state.user.user_name
)

export const getUserEmail = createSelector(
    [userSelector],
    state => state.user.user_address
)

export const getBelongTeams = createSelector(
    [userSelector],
    state => state.user.belongTeams
)

export const getIsSignedIn = createSelector(
    [userSelector],
    state => state.user.isSignedIn
)

export const getBelongTeamInfoLength = createSelector(
    [userSelector],
    state => state.user.belongTeamInfo.length
)