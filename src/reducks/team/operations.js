import {push} from "connected-react-router";
import {fetchTeamMapsAction,changeTeamAction,updateTeamAction,clearTeamAction} from './actions';
import {updateMapAction,updateMapIdAction,clearMapAction} from '../pMap/actions'
import {clearCardsAction} from '../card/actions'
import {setRequestErrorAction} from '../requestError/actions'
import axios from 'axios'
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

const closeWebSocket = (ws) => {
    //ws.close()
}

export const fetchTeam = (teamId) => {

    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        
        //リクエストパラメータの準備
        const team_id = getState().team.team_id

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)
        
        try{
            const res = await axios.post(`${uri.getTEAM}information.php`,params)
            if (res.data.result){

                const team = res.data.result
                console.log('UPDATETEAMACTION',team)
                dispatch(updateTeamAction(team))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

        
    }
}

export const changeTeam = (teamId) => {

    return async(dispatch,getState) => {
        //ここら辺にチーム切り替えの非同期処理
        const team = getState().team
        dispatch(changeTeamAction(team))
    }

}

export const inviteTeam = (userId,ws) => {
    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        
        const opponent_id = userId
        const my_team_id = getState().team.team_id

        let params = new URLSearchParams()
        params.append('team_id',my_team_id)
        params.append('token',token)
        params.append('user_id',opponent_id)
        
        try{
            const res = await axios.post(`${uri.getTEAM}delete.php`,params)

            if(res.data.result){
                //招待完了ダイアログとかあれば良いかも
                const inviteInfo = JSON.stringify({
                    command:'subscribe',
                    message:opponent_id
                })
                ws.send(inviteInfo)
            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'ユーザーの招待に失敗しました',
                    errorDetail:'ユーターの招待に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'ユーザーの招待に失敗しました',
                    errorDetail:'ユーターの招待に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

    }
}

export const deleteTeam = (ws) => {
    return async (dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        
        //リクエストパラメータの準備
        const team_id = getState().team.team_id

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)
        
        try{
            const res = await axios.post(`${uri.getTEAM}delete.php`,params)
            console.log('deleteTeam',res)
            if (res.data.result){
                console.log('削除成功してるで')
                closeWebSocket(ws)
                console.log('クローズしました')
                dispatch(clearTeamAction())
                dispatch(clearMapAction())
                dispatch(clearCardsAction())
                dispatch(push('/'))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの削除に失敗しました',
                    errorDetail:'チームの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの削除に失敗しました',
                    errorDetail:'チームの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }


    }
}

export const updateTeam = (name,detail) => {
    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        //リクエストパラメータの準備
        const team_id = getState().team.team_id
        const team_name = name
        const team_description = detail

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)
        params.append('team_name',team_name)
        params.append('team_description',team_description)

        try{

            const res = await axios.post(`${uri.getTEAM}update.php`,params)

            if(!res.data.result){
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の更新に失敗しました',
                    errorDetail:'チーム情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の更新に失敗しました',
                    errorDetail:'チーム情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

    }
}

export const exitTeam = () => {
    return async(dispatch,getState) => {

        console.log('退出処理')

    }
}

export const createTeam = (teamName,teamDetail,mapName,mapDetail,isCreateMap,ws) => {
    return async(dispatch,getState) => {
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        if(isCreateMap){//マップも作成
            //team作成→→team情報取得→→map作成→map情報取得の順にやっていく（4回API叩く）。
    //--------------------------------------------チームの作成------------------------------------------------------------------------------------------------
            //送信するチームを作成
            const team_name = teamName
            const team_description = teamDetail

            if(token === "")dispatch(push('/signin'))//トークンがないのでリダイレクト
            //リクエストパラメータの準備
            let teamRegistParams = new URLSearchParams()
            teamRegistParams.append('token',token)
            teamRegistParams.append('team_name',team_name)
            teamRegistParams.append('team_description',team_description)
                console.log('teamCreateのトークンは',token)
            try{
                const res = await axios.post(`${uri.getTEAM}register.php`,teamRegistParams)

                if(res.data.result){
                    console.log(ws)
                    closeWebSocket(ws)
                    console.log('クローズした')
                    
                    console.log('success-createTeam',res.data.result)
                    const team_id = res.data.result.team_id
                    dispatch(updateTeamAction({team_id:team_id}))
                    dispatch(clearMapAction())
                    dispatch(clearCardsAction())
                }else{
                    console.log('badError',res.data)
                    dispatch(setRequestErrorAction({
                        errorTitle:'チームの作成に失敗しました',
                        errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                    return
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの作成に失敗しました',
                    errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
            console.log('チーム作成完了')
    //--------------------------------------------チーム情報の取得------------------------------------------------------------------------------------------------
            const team_id = getState().team.team_id

            let teamInfoParams = new URLSearchParams()
            teamInfoParams.append('token',token)
            teamInfoParams.append('team_id',team_id)

            try{
                const res = await axios.post(`${uri.getTEAM}information.php`,teamInfoParams)

                if(res.data.result){
                    console.log('success-teamInfo',res.data.result)
                    const teamInfo = res.data.result
                    dispatch(updateTeamAction(teamInfo))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'チーム情報の取得に失敗しました',
                        errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                    return
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
            console.log('チーム情報取得完了')
    //--------------------------------------------マップの作成------------------------------------------------------------------------------------------------

            //送信するマップを作成
            const map_name = mapName
            const map_description = mapDetail

            if(token === "")dispatch(push('/signin'))//トークンがないのでリダイレクト
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
                    const map_id = res.data.result[0].map_id
                    dispatch(updateMapIdAction({map_id:map_id}))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'マップの作成に失敗しました',
                        errorDetail:'マップの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                    return
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップの作成に失敗しました',
                    errorDetail:'マップの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
            console.log('マップ作成完了')
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
                    console.log('最後のマップ更新処理完了',mapInfo)
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
            console.log('マップ情報取得完了')

        }else{
            //チームのみ作成
            //--------------------------------------------チームの作成------------------------------------------------------------------------------------------------
            //送信するチームを作成
            const team_name = teamName
            const team_description = teamDetail

            if(token === "")dispatch(push('/signin'))//トークンがないのでリダイレクト
            //リクエストパラメータの準備
            let teamRegistParams = new URLSearchParams()
            teamRegistParams.append('token',token)
            teamRegistParams.append('team_name',team_name)
            teamRegistParams.append('team_description',team_description)

            try{
                const res = await axios.post(`${uri.getTEAM}register.php`,teamRegistParams)

                if(res.data.result){
                    console.log('success-createTeam',res.data.result)
                    closeWebSocket(ws)
                    console.log('クローズしました')
                    const team_id = res.data.result.team_id
                    dispatch(updateTeamAction({team_id:team_id}))
                    dispatch(clearMapAction())
                    dispatch(clearCardsAction())
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'チームの作成に失敗しました',
                        errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                    return
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの作成に失敗しました',
                    errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
    //--------------------------------------------チーム情報の取得------------------------------------------------------------------------------------------------
            const team_id = getState().team.team_id

            let teamInfoParams = new URLSearchParams()
            teamInfoParams.append('token',token)
            teamInfoParams.append('team_id',team_id)

            try{
                const res = await axios.post(`${uri.getTEAM}information.php`,teamInfoParams)

                if(res.data.result){
                    console.log('success-teamInfo',res.data.result)
                    const teamInfo = res.data.result
                    dispatch(updateTeamAction(teamInfo))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'チーム情報の取得に失敗しました',
                        errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                    return
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
            }
        }
    }
}

export const test = () => {
    return async(dispatch,getState) => {
    
        try{
            const testSend = JSON.stringify({
                message:'hello!'
            })
            

        }catch(e){
            
        }

          
    }
}