import axios from "axios";
import {push} from "connected-react-router";
import {updateMapSizeAction,changeMapAction,updateMapAction,updateMapIdAction,updateMapAxisAction,clearMapAction} from './actions';
import {clearCardsAction} from '../card/actions'
import {setRequestErrorAction} from '../requestError/actions'

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
        const token = getToken()
        if(token === "")dispatch(push('/signin'))

        const map_id = getState().pMap.map_id

        //リクエストパラメータの準備
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('map_id',map_id)

        try{
            const res = await axios.post(`${uri.getMAP}map_delete.php`,params)

            if(res.data.result){
                dispatch(clearMapAction())
                dispatch(clearCardsAction())
            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'マップの削除に失敗しました',
                    errorDetail:'マップの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

            
        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップの削除に失敗しました',
                    errorDetail:'マップの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }

    }
}

export const updateMap = (name,detail) => {
    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        //リクエストパラメータの準備
        const map_id = getState().pMap.map_id
        const axis = getState().pMap.axis
        const map_name = name
        const map_description = detail

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('map_id',map_id)
        params.append('map_name',map_name)
        params.append('map_description',map_description)
        params.append('parameter_top',axis.vaHigh)
        params.append('parameter_under',axis.vaLow)
        params.append('parameter_left',axis.haLow)
        params.append('parameter_right',axis.haHigh)

        try{
            const res = await axios.post(`${uri.getMAP}map_update.php`,params)

            if(!res.data.result){
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の更新に失敗しました',
                    errorDetail:'マップ情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の更新に失敗しました',
                    errorDetail:'マップ情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }


    }
}

export const createMap = (name,detail) => {
    return async(dispatch,getState) => {
        const token = getToken()
        if(token === "")dispatch(push('/signin'))

//--------------------------------------------マップの作成------------------------------------------------------------------------------------------------
            const team_id = getState().team.team_id
            const map_name = name
            const map_description = detail

            //リクエストパラメータの準備
            let mapRegistParams = new URLSearchParams()
            mapRegistParams.append('token',token)
            mapRegistParams.append('team_id',team_id)
            mapRegistParams.append('map_name',map_name)
            mapRegistParams.append('map_description',map_description)
            mapRegistParams.append('parameter_top',"")
            mapRegistParams.append('parameter_under',"")
            mapRegistParams.append('parameter_left',"")
            mapRegistParams.append('parameter_right',"")

            try{
                const res = await axios.post(`${uri.getMAP}create_map.php`,mapRegistParams)

                if(res.data.result){
                    console.log('success-createMap',res.data.result)
                    const map_id = res.data.result.map_id
                    dispatch(updateMapIdAction({map_id:map_id}))
                    dispatch(clearCardsAction())
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'マップの作成に失敗しました',
                        errorDetail:'マップの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップの作成に失敗しました',
                    errorDetail:'マップの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

    //--------------------------------------------マップの情報取得------------------------------------------------------------------------------------------------

            const map_id = getState().pMap.map_id

            let mapInfoParams = new URLSearchParams()
            mapInfoParams.append('token',token)
            mapInfoParams.append('team_id',team_id)
            mapInfoParams.append('map_id',map_id)

            try{
                const res = await axios.post(`${uri.getMAP}information.php`,mapInfoParams)

                if(res.data.result){
                    console.log('success-mapInfo',res.data.result)
                    const mapInfo = res.data.result
                    dispatch(updateMapAction(mapInfo))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'マップ情報の取得に失敗しました',
                        errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の取得に失敗しました',
                    errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

       
    }
}

export const updateMapAxis = (vaHigh,vaLow,haHigh,haLow,ws) => {
    return async(dispatch,getState) => {
        if(getState().pMap.mapId === "") return
        dispatch(fetchMap())

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        //リクエストパラメータの準備
        const map_id = getState().pMap.map_id
        const map_name = getState().pMap.map_name
        const map_description = getState().pMap.map_description

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('map_id',map_id)
        params.append('map_name',map_name)
        params.append('map_description',map_description)
        params.append('parameter_top',vaHigh)
        params.append('parameter_under',vaLow)
        params.append('parameter_left',haLow)
        params.append('parameter_right',haHigh)

        try{
            const res = await axios.post(`${uri.getMAP}map_update.php`,params)

            if(res.data.result){
                const mapInfo = JSON.stringify({
                    command:'update_parameter',
                    message:map_id
                })
                ws.send(mapInfo)
            }
            else{
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の更新に失敗しました',
                    errorDetail:'マップ情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の更新に失敗しました',
                    errorDetail:'マップ情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

        

    }
}

export const fetchMap = () => {
    return async(dispatch,getState) => {
        //トークンの取得
        const token = getToken()
        if(token === "")dispatch(push('/signin'))

        //リクエストパラメータの準備
        const team_id = getState().team.team_id//ユーザーがチームに所属しているか確認するために必用
        const map_id = getState().pMap.map_id
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)
        params.append('map_id',map_id)

        try{
            const res = await axios.post(`${uri.getMAP}information.php`,params)

            if(res.data.result){
                console.log('success',res.data.result)
                const mapInfo = res.data.result
                dispatch(updateMapAction(mapInfo))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の取得に失敗しました',
                    errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の取得に失敗しました',
                    errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

    }
}

/*export const fetchMapInfo = () => {
    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken()
        if(token === "")dispatch(push('/signin'))

        //リクエストパラメーターの準備
        const team_id  = getState().team.team_id
        const map_id = getState().pMap.map_id

    }
}*/