import * as Actions from './actions'
import initialState from '../store/initialState'

export const PMapReducer = (state = initialState.pMap,action) => {

    switch(action.type){

        case Actions.ADD_CARD_ACTION:
            return{
                ...state,
                cards:[...action.payload.cards],
                selectedCardId:action.payload.selectedCardId
            }

        case Actions.UPDATE_CARD_ACTION:
            return{
                ...state,
                cards:[...action.payload]
            }
        
        case Actions.SELECT_CARD_ACTION:
            return{
                ...state,
                selectedCardId:action.payload
            }
        
        case Actions.DELETE_CARD_ACTION:
            return{
                ...state,
                cards:[...action.payload],
                selectedCardId:""
            }
        
        case Actions.SORT_CARDS_ACTION:
            return{
                ...state,
                cards:[...action.payload],
            }

        case Actions.DESELECT_CARD_ACTION:
            return{
                ...state,
                selectedCardId:""
            }

        case Actions.FETCH_CARDS_ACTION:
            return{
                ...state,
                cards:[...action.payload]
            }

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
                ...action.payload
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