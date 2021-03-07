import {push} from "connected-react-router";
import {addCardAction,updateCardAction,selectCardAction,fetchCardsAction,deselectCardAction,deleteCardAction} from './actions';
import {setRequestErrorAction} from '../requestError/actions'
import axios from "axios";

import URI from '../../URI'

const uri = new URI()

const getToken = () => {
    //トークンの取得
    let token = "";
    const cookies = document.cookie.split(';')
    for(const c of cookies){
        const cookie = c.split('%3D')
        if(cookie[0] == 'token') token = cookie[1]
    }
    return token
}

export const addCard = (name,detail,x,y,height,width,ws) => {
    return async(dispatch,getState) => {
        

        const token = getToken()
        if(token === "")dispatch(push('/signin'))

        const map_id = getState().pMap.map_id
        //リクエストパラメータの準備
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('map_id',map_id)
        params.append('card_name',name)
        params.append('card_description',detail)
        params.append('card_x',x)
        params.append('card_y',y)
        params.append('card_height',height)
        params.append('card_width',width)
        
        try{
            console.log('addcardに送るmap_idとtoken',map_id,'---',token)
            const res = await axios.post(`${uri.getCARD}create_card.php`,params)
            console.log('create_card叩きました',map_id)
            if(res.data.result){
                //WebSocketサーバに通知する処理が入る。
                const cardInfo = JSON.stringify({
                    command:'update_data',
                    message:map_id
                })
                console.log('送るデータ',cardInfo)
                ws.send(cardInfo)
            }else{
                console.log('errorororo',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの作成に失敗しました',
                    errorDetail:'カードの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'カードの作成に失敗しました',
                errorDetail:'カードの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
            return
        }



    }
}

export const updateCard = (id,name,detail,x,y,width,height,ws) => {
    
    return async(dispatch,getState) => {
        /*const newCoordinate = {
            name:name,
            detail:detail,
            x:x,
            y:y,
            height:height,
            width:width,
        }
        const prevCards = getState().cards.cards;
        const nextCards = prevCards.map((card,i) => {
            if(id !== i) return card;
            return {...card,...newCoordinate};
        })
        dispatch(updateCardAction(nextCards))*///前のやつ残してる
        const token = getToken()
        if(token === "")dispatch(push('/signin'))
        console.log(name,detail,x,y,height,width)
        const map_id = getState().pMap.map_id

        //リクエストパラメータの準備
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('map_id',map_id)
        params.append('card_id',id)
        params.append('card_name',name)
        params.append('card_description',detail)
        params.append('card_x',x)
        params.append('card_y',y)
        params.append('card_height',height)
        params.append('card_width',width)

        try{
            const res = await axios.post(`${uri.getCARD}card_update.php`,params)
            console.log('カード変更')
            if(res.data.result){
                //
                const cardInfo = JSON.stringify({
                    command:'update_data',
                    message:map_id
                })
                ws.send(cardInfo)
            }else{
                console.log('updateError',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'カード情報の変更に失敗しました',
                    errorDetail:'カード情報の変更に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'カード情報の変更に失敗しました',
                errorDetail:'カード情報の変更に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
            return
        }

    }

}

export const deleteCard = (id,ws) => {
    return async(dispatch,getState) => {
        /*const prevCards = getState().cards.cards
        const nextCards = prevCards.filter((card,i) => i !== deleteCardId);
        dispatch(deleteCardAction(nextCards))*///前回の残してる

        const token = getToken()
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('card_id',id)

        try{
            const res = await axios.post(`${uri.getCARD}card_delete.php`,params)

            if(res.data.result){
                const map_id = getState().pMap.map_id
                //WebSocketサーバに通知する処理が入る。
                const cardInfo = JSON.stringify({
                    command:'update_data',
                    message:map_id
                })
                ws.send(cardInfo)
            }else{
                console.log('deleteError',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの削除に失敗しました',
                    errorDetail:'カードの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'カードの削除に失敗しました',
                errorDetail:'カードの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
            return
        }



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
        const cards = getState().cards.cards
        dispatch(fetchCardsAction(cards))

    }

}

export const deselectCard = () => {
    return async(dispatch) => {
        dispatch(deselectCardAction())
    }
}


/*const prevCards = getState().cards.cards;
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
        dispatch(addCardAction(pMapCards));*///今までの非同期未実装バージョン一応残しておきます。