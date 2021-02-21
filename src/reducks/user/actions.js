export const FETCH_BELONG_TEAMS_ACTION = 'FETCH_BELONG_TEAMS_ACTION'
export const fetchBelongTeamsAction = (teams) => {
    return{
        type:'FETCH_BELONG_TEAMS_ACTION',
        payload:teams
    }
}
export const CHANGE_USER_INFO_ACTION = 'CHANGE_USER_INFO_ACTION'
export const changeUserInfoAction = (name) => {
    return{
        type:'CHANGE_USER_INFO_ACTION',
        payload:name
    }
}