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

export const SIGN_UP_ACTION = 'SIGN_UP_ACTION'
export const signUpAction = (userInfo) => {
    return{
        type:'SIGN_UP_ACTION',
        payload:userInfo
    }
}

export const AUTO_AUTH_ACTION = 'AUTO_AUTH_ACTION'
export const autoAuthAction = (userInfo) => {
    return{
        type:'AUTO_AUTH_ACTION',
        payload:userInfo
    }
}