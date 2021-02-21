import * as Actions from './actions'
import initialState from '../store/initialState'

export const UserReducer = (state = initialState.user,action) => {
    switch(action.type){
        case Actions.FETCH_BELONG_TEAMS_ACTION:
            return{
                ...state,
                belongTeams:[...action.payload]

            }
        case Actions.CHANGE_USER_INFO_ACTION:
            return{
                ...state,
                userName:action.payload
            }
        
            default:
                return state;

    }
}