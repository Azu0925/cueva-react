import {push} from "connected-react-router";
import {addCardAction,updateCardAction,selectCardAction,fetchCardsAction,updateMapSizeAction,deselectCardAction,sortCardsAction,deleteCardAction,changeMapAction,updateMapAction,updateMapAxisAction} from './actions';

export const updateMapSize = (width,height) => {

    return async(dispatch) => {
        const size = {
            width:width,
            height:height
        }

        dispatch(updateMapSizeAction(size))
    }

}

export const changeMap = (mapId) => {
    return async(dispatch,getState) => {

        //ここら辺にマップ切り替えの非同期処理

        const map = getState().pMap
        dispatch(changeMapAction(map))
    }
}

export const deleteMap = () => {
    return async(dispatch,getState) => {
        console.log('deleteMap')
    }
}

export const updateMap = (name,detail) => {
    return async(dispatch,getState) => {

        const nextMapInfo = {
            mapName:name,
            mapDetail:detail
        }
        dispatch(updateMapAction(nextMapInfo))

    }
}

export const createMap = (name,detail) => {
    return async(dispatch,getState) => {
        const userId = getState().user.userId
        console.log('createMap',userId,name,detail)
    }
}

export const updateMapAxis = (vaHigh,vaLow,haHigh,haLow) => {
    return(dispatch,getState) => {
        if(getState().pMap.mapId === "") return
        const newAxis = {
            vaHigh:vaHigh,
            vaLow:vaLow,
            haHigh:haHigh,
            haLow:haLow
        }

        dispatch(updateMapAxisAction(newAxis))

    }
}