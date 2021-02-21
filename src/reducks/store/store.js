import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
    compose
}from 'redux';
import {PMapReducer} from '../pMap/reducers';
import {TeamReducer} from '../team/reducers';
import {UserReducer} from '../user/reducers';
import {connectRouter,routerMiddleware} from "connected-react-router";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history){
    return reduxCreateStore(
        combineReducers({
            router:connectRouter(history),
            pMap:PMapReducer,
            team:TeamReducer,
            user:UserReducer
        }),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    )
}