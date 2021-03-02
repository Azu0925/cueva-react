import {push} from "connected-react-router";
import {fetchTeamMapsAction,changeTeamAction,updateTeamAction} from './actions';
import {updateMapAction} from '../pMap/actions'
import {setRequestErrorAction} from '../requestError/actions'
import axios from 'axios'
import URI from '../../URI'

const uri = new URI()

export const fetchTeam = (teamId) => {

    return async(dispatch,getState) => {

        //トークンの取得
        let token = "";
        const cookies = document.cookie.split(';')
        console.log(cookies)
        for(const c of cookies){
            const cookie = c.split('%3D')
            if(cookie[0] == 'token') token = cookie[1]
        }
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
                dispatch(updateTeamAction(team))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
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

export const inviteTeam = (userId) => {
    return async(dispatch,getState) => {

        //チーム情報取得してメッセージ作ったりid送ったりとか非同期処理
        console.log('inviteTeam',userId)
    }
}

export const deleteTeam = () => {
    return async (dispatch,getState) => {

        //トークンの取得
        let token = "";
        const cookies = document.cookie.split(';')
        console.log(cookies)
        for(const c of cookies){
            const cookie = c.split('%3D')
            if(cookie[0] == 'token') token = cookie[1]
        }
        if(token === "")dispatch(push('/signin'))

        
        //リクエストパラメータの準備
        const team_id = getState().team.team_id

        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)
        
        try{
            const res = await axios.post(`${uri.getTEAM}delete.php`,params)
            if (res.data.result){
                //リダイレクトした時点でstoreは初期化されるはずだから初期化の処理は記述していない。初期化されなかったら初期用actionを追加すること。
                dispatch(push('/'))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの削除に失敗しました',
                    errorDetail:'チームの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの削除に失敗しました',
                    errorDetail:'チームの削除に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }


    }
}

export const updateTeam = (name,detail) => {
    return async(dispatch,getState) => {

        //トークンの取得
        let token = "";
        const cookies = document.cookie.split(';')
        console.log(cookies)
        for(const c of cookies){
            const cookie = c.split('%3D')
            if(cookie[0] == 'token') token = cookie[1]
        }
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
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の更新に失敗しました',
                    errorDetail:'チーム情報の更新に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }

    }
}

export const exitTeam = () => {
    return async(dispatch,getState) => {

        console.log('退出処理')

    }
}

export const createTeam = (teamName,teamDetail,mapName,mapDetail,isCreateMap) => {
    return async(dispatch,getState) => {
        //トークンの取得
        let token = "";
        const cookies = document.cookie.split(';')
        console.log(cookies)
        for(const c of cookies){
            const cookie = c.split('%3D')
            if(cookie[0] == 'token') token = cookie[1]
        }
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
                
            try{
                const res = await axios.post(`${uri.getTEAM}register.php`,teamRegistParams)

                if(res.data.result){
                    console.log('success-createTeam',res.data.result)
                    const team_id = res.data.result.team_id
                    dispatch(updateTeamAction({team_id:team_id}))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'チームの作成に失敗しました',
                        errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの作成に失敗しました',
                    errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
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
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }
    //--------------------------------------------マップの作成------------------------------------------------------------------------------------------------

            //送信するチームを作成
            const map_name = mapName
            const map_description = mapDetail

            if(token === "")dispatch(push('/signin'))//トークンがないのでリダイレクト
            //リクエストパラメータの準備
            let mapRegistParams = new URLSearchParams()
            mapRegistParams.append('token',token)
            mapRegistParams.append('map_name',map_name)
            mapRegistParams.append('map_description',map_description)
            mapRegistParams.append('parameter_top',"")
            mapRegistParams.append('parameter_under',"")
            mapRegistParams.append('parameter_left',"")
            mapRegistParams.append('parameter_right',"")

            try{
                const res = await axios.post(`${uri.getMAP}register.php`,mapRegistParams)

                if(res.data.result){
                    console.log('success-createMap',res.data.result)
                    const map_id = res.data.result.map_id
                    dispatch(updateMapAction({map_id:map_id}))
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
                    const team_id = res.data.result.team_id
                    dispatch(updateTeamAction({team_id:team_id}))
                }else{
                    dispatch(setRequestErrorAction({
                        errorTitle:'チームの作成に失敗しました',
                        errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                    }))
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チームの作成に失敗しました',
                    errorDetail:'チームの作成に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
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
                }
            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }
        }
    }
}

export const test = () => {
    return async(dispatch,getState) => {
        const e = 1
        try{
            const e = 2
        }catch(e){
            console.log('fdfdfdfdfdf',e)
        }

            dispatch(updateTeamAction({teamId:1}))
            console.log('テストteamid',getState().team.teamId)
    }
}