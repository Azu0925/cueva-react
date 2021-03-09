import * as Actions from './actions'
import initialState from '../store/initialState'

export const RequestErrorReducer = (state = initialState.requestError,action) => {
    switch(action.type){
        case Actions.SET_REQUEST_ERROR_ACTION :
            return action.payload

            default:
                return state;

    }

}