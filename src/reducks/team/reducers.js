import * as Actions from './actions'
import initialState from '../store/initialState'

export const TeamReducer = (state = initialState.team,action) => {

    switch(action.type){
        case Actions.FETCH_TEAM_MAPS_ACTION:
            return{
                ...state,
                inTeamPMaps:[...action.payload]
            }

        case Actions.CHANGE_TEAM_ACTION:
            return{
                ...action.payload
            }
        
        case Actions.UPDATE_TEAM_ACTION:
            return{
                ...state,
                ...action.payload
            }

        default:
            return state
    }

}