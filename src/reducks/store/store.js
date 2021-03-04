import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
    compose
}from 'redux';
import {TeamReducer} from '../team/reducers';
import {PMapReducer} from '../pMap/reducers';
import {CardReducer} from '../card/reducers';
import {UserReducer} from '../user/reducers';
import {RequestErrorReducer} from '../requestError/reducers';
import {WebSocketReducer} from '../webSocket/reducers';
import {connectRouter,routerMiddleware} from "connected-react-router";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history){
    return reduxCreateStore(
        combineReducers({
            user:UserReducer,
            team:TeamReducer,
            pMap:PMapReducer,
            cards:CardReducer,
            router:connectRouter(history),
            webSocketAPI:WebSocketReducer,
            requestError:RequestErrorReducer
        }),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    )
}