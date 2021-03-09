import * as Actions from './actions'
import initialState from '../store/initialState'

export const WebSocketReducer = (state = initialState.webSocketAPI,action) => {

    switch(action.type){
        case Actions.CHANGE_WEBSOCKET_ACTION:
            console.log('reducer',action.payload)
            return {
                ...state,
                webSocket:action.payload
            }

        default:
            return state;

    }
}