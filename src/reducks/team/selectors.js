import {createSelector} from 'reselect';

const teamSelector = state => state;

export const getTeamId = createSelector(
    [teamSelector],
    state => state.team.team_id
)

export const getTeamName = createSelector(
    [teamSelector],
    state => state.team.team_name
)

export const getInTeamMaps = createSelector(
    [teamSelector],
    state => state.team.inTeamPMaps
)

export const getTeam = createSelector(
    [teamSelector],
    state => state.team
)

export const getMapInfo = createSelector(
    [teamSelector],
    state => state.team.map_info
)