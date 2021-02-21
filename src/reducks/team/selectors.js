import {createSelector} from 'reselect';

const teamSelector = state => state;

export const getTeamId = createSelector(
    [teamSelector],
    state => state.team.teamId
)

export const getTeamHostId = createSelector(
    [teamSelector],
    state => state.team.hostId
)

export const getInTeamMaps = createSelector(
    [teamSelector],
    state => state.team.inTeamPMaps
)

export const getTeam = createSelector(
    [teamSelector],
    state => state.team
)