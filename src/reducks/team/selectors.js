import {createSelector} from 'reselect';

const teamSelector = state => state;

export const getTeamId = createSelector(
    [teamSelector],
    state => state.team.team_id
)

export const getInTeamMaps = createSelector(
    [teamSelector],
    state => state.team.inTeamPMaps
)

export const getTeam = createSelector(
    [teamSelector],
    state => state.team
)