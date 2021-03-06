import * as Actions from './actions'
import initialState from '../store/initialState'

export const UserReducer = (state = initialState.user,action) => {
    switch(action.type){
        case Actions.FETCH_BELONG_TEAMS_ACTION:
            return{
                ...state,
                belongTeamInfo:[...action.payload]

            }
        case Actions.CHANGE_USER_INFO_ACTION:
            return{
                ...state,
                ...action.payload
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
        
        case Actions.CLEAR_USER_ACTION:
            return{
                isSignedIn:false,
                user_id:"",
                user_name:"",
                user_address:"",
                belongTeamInfo:[],
                invitedList:[],
                invitedNum:0
            }
        
        default:
            return state;

    }
}