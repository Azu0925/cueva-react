import * as Actions from './actions'
import initialState from '../store/initialState'

export const PMapReducer = (state = initialState.pMap,action) => {

    switch(action.type){

        case Actions.UPDATE_MAP_SIZE_ACTION:
            return{
                ...state,
                size:{...action.payload}
            }
            
        case Actions.CHANGE_MAP_ACTION:
            return{
                ...action.payload
            }
        case Actions.FETCH_MAP_DETAIL_ACTION:
            return{
                ...state,
                ...action.payload
            }
        
        case Actions.UPDATE_MAP_ACTION:
            return{
                ...state,
                map_id:action.payload.map_id,
                map_name:action.payload.map_name,
                map_description:action.payload.map_description,
                axis:{
                    ...state.axis,
                    vaHigh:action.payload.parameter.top,
                    vaLow:action.payload.parameter.under,
                    haHigh:action.payload.parameter.right,
                    haLow:action.payload.parameter.left,
                }
            }
        
        case Actions.UPDATE_NAP_AXIS:
            return{
                ...state,
                axis:{...action.payload}
            }

        default:
            console.log('defaultを通過');
            return state
    }

}