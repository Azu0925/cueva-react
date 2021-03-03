import * as Actions from './actions'
import initialState from '../store/initialState'

export const UserReducer = (state = initialState.user,action) => {
    switch(action.type){
        case Actions.FETCH_BELONG_TEAMS_ACTION:
            return{
                ...state,
                belongTeamsInfo:[...action.payload]

            }
        case Actions.CHANGE_USER_INFO_ACTION:
            return{
                ...state,
                user_name:action.payload.name,
                user_address:action.payload.email
            }
        
        case Actions.FETCH_INVITED_LIST_ACTION:
            return{
                ...state,
                invitedList:[...action.payload]
            }

        case Actions.AUTO_AUTH_ACTION:
            return{
                ...state,
                isSignedIn:true,
                user_name:action.payload.user_name,
                user_address:action.payload.user_address,
                belongTeamInfo:[...action.payload.team_info]
            }
    
        default:
            return state;

    }
}