import {push} from "connected-react-router";
import {addCardAction,updateCardAction,selectCardAction,fetchCardsAction,updateMapSizeAction,deselectCardAction,sortCardsAction,deleteCardAction,changeMapAction,updateMapAction} from './actions';

export const addCard = (name,detail,x,y,height,width) => {
    return async(dispatch,getState) => {
        const prevCards = getState().pMap.cards;
        const card = {
            name:name,
            detail:detail,
            x:x,
            y:y,
            height:height,
            width:width,
        }
        const nextCards = [...prevCards,{...card}]
        const selectedCardId = nextCards.length - 1

        const pMapCards = {
            cards:nextCards,
            selectedCardId:selectedCardId
        }

        //ここに非同期処理

        dispatch(addCardAction(pMapCards));

    }
}

export const updateCard = (id,name,detail,x,y,width,height) => {
    
    return async(dispatch,getState) => {
        const newCoordinate = {
            name:name,
            detail:detail,
            x:x,
            y:y,
            height:height,
            width:width,
        }
        const prevCards = getState().pMap.cards;
        const nextCards = prevCards.map((card,i) => {
            if(id !== i) return card;
            return {...card,...newCoordinate};
        })

        //ここに非同期処理

        dispatch(updateCardAction(nextCards))
    }

}

export const deleteCard = (deleteCardId,unsetRefCurrent) => {
    return async(dispatch,getState) => {

        const prevCards = getState().pMap.cards
        const sortCard = prevCards[deleteCardId]
        const delCards = prevCards.filter((card,i) => i !== deleteCardId);
        const nextCards = [...delCards,{...sortCard}]
        
        dispatch(sortCardsAction(nextCards))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*const nextCards = prevCards.filter((card,i) => i !== deleteCardId);

        const deleteMaterial = {
            cards:nextCards,
            unsetRefCurrent:unsetRefCurrent
        }*/
        //dispatch(deleteCardAction(deleteMaterial))
        console.log('到達してる')


    }
}

export const deselectCard = () => {
    return async(dispatch) => {
        dispatch(deselectCardAction())
    }
}

export const selectCard = (selectedCardId) => {//直接action発行してもいいけど非同期処理を入れるかもしれんから一応operationに書く。

    return async(dispatch) => {

        dispatch(selectCardAction(selectedCardId))

    }

}

export const fetchCards = (/*チーム>mapのcardを全て取得するため、チームとマップ二つかどっちかのidが引数になるかも*/) => {

    return async(dispatch,getState) => {
        console.log('fetch!!')
        //ここに非同期処理(DBのcard全て取得)
        const cards = getState().pMap.cards
        dispatch(fetchCardsAction(cards))

    }

}

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