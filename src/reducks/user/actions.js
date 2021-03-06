export const FETCH_BELONG_TEAMS_ACTION = 'FETCH_BELONG_TEAMS_ACTION'
export const fetchBelongTeamsAction = (teams) => {
    return{
        type:'FETCH_BELONG_TEAMS_ACTION',
        payload:teams
    }
}

export const FETCH_INVITED_LIST_ACTION = 'FETCH_INVITED_LIST_ACTION'
export const fetchInvitedListAction = (invitedList) => {
    return{
        type:'FETCH_INVITED_LIST_ACTION',
        payload:invitedList
    }
}

export const UPDATE_INVITED_NUM_ACTION = 'UPDATE_INVITED_NUM_ACTION'
export const updateInvitedNumAction = (invitedNum) => {
    return{
        type:'UPDATE_INVITED_NUM_ACTION',
        payload:invitedNum
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

export const CLEAR_USER_ACTION = 'CLEAR_USER_ACTION'
export const clearUserAction = () => {
    return{
        type:'CLEAR_USER_ACTION'
    }
}