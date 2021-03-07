export const FETCH_TEAM_MAPS_ACTION = 'FETCH_TEAM_MAPS_ACTION'
export const fetchTeamMapsAction = (inTeamMaps) => {
    return{
        type:'FETCH_TEAM_MAPS_ACTION',
        payload:inTeamMaps
    }
}

export const CHANGE_TEAM_ACTION = 'CHANGE_TEAM_ACTION'
export const changeTeamAction = (team) => {
    return{
        type:'CHANGE_TEAM_ACTION',
        payload:team
    }
}

export const UPDATE_TEAM_ACTION = 'UPDATE_TEAM_ACTION'
export const updateTeamAction = (team) => {
    return{
        type:'UPDATE_TEAM_ACTION',
        payload:team
    }
}

export const CLEAR_TEAM_ACTION = 'CLEAR_TEAM_ACTION'
export const clearTeamAction = () => {
    return{
        type:'CLEAR_TEAM_ACTION'
    }
}
