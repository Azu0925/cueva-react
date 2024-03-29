import {push} from "connected-react-router";
import {fetchBelongTeamsAction,changeUserInfoAction,autoAuthAction,fetchInvitedListAction,clearUserAction} from './actions';
import {updateTeamAction,clearTeamAction} from '../team/actions'
import {clearMapAction,updateMapAction} from '../pMap/actions'
import { clearCardsAction,updateCardAction } from "../card/actions";
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

export const fetchUserInfo = () => {
    return async(dispatch) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        //パラメータの準備
        let params = new URLSearchParams()
        params.append('token',token)
        
        try{
            const res = await axios.post(`${uri.getUSER}user_information.php`,params)
            if(res.data.result){
                const userInfo = res.data.result
                dispatch(changeUserInfoAction(userInfo))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
            }
        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'ユーザー情報の取得に失敗しました',
                    errorDetail:'ユーザー情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }

    }
}


export const fetchBelongTeams = () => {
    return async(dispatch) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        //パラメータの準備
        let params = new URLSearchParams()
        params.append('token',token)
        
        try{
            const res = await axios.post(`${uri.getUSER}user_information.php`,params)
            if(res.data.result){
                const belongTeamsInfo = res.data.result.team_info
                dispatch(fetchBelongTeamsAction(belongTeamsInfo))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'ユーザー情報の取得に失敗しました',
                    errorDetail:'ユーザー情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
            }
        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'ユーザー情報の取得に失敗しました',
                    errorDetail:'ユーザー情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
        }

    }

}

export const logout = (ws) => {
    return async(dispatch,getState) => {
        
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',token)

        try{
            const res = await axios.post(`${uri.getUSER}logout.php`,params)
            if(res.data.result){
                document.cookie = "token=; max-age=0";
                closeWebSocket(ws)
                console.log('クローズしました')
                dispatch(clearTeamAction())
                dispatch(clearMapAction())
                dispatch(clearCardsAction())
                dispatch(clearUserAction())
                dispatch(push('/signin'))
            }else{
                console.log('handleError',res.data.error)
                dispatch(setRequestErrorAction({
                    errorTitle:'ログアウトに失敗しました',
                    errorDetail:'ログアウトの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
            }
        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'ログアウトに失敗しました',
                errorDetail:'ログアウトに失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
        }
    }
}

export const withdrawal = (ws) => {
    return async(dispatch) => {
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',token)

        try{
            const res = await axios.post(`${uri.getUSER}delete.php`,params)
            
            if(res.data.result){
                document.cookie = "token=; max-age=0";
                closeWebSocket(ws)
                console.log('クローズしました')
                dispatch(clearTeamAction())
                dispatch(clearMapAction())
                dispatch(clearCardsAction())
                dispatch(clearUserAction())
                dispatch(push('/signup'))
            }else{
                console.log('handleError',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'退会の処理に失敗しました',
                    errorDetail:'退会の処理に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
            }
        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'退会の処理に失敗しました',
                errorDetail:'退会の処理に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
        }
    }
}

export const changeUserInfo = (name,email) => {
    return async(dispatch,getState) => {

        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('user_name',name)
        params.append('user_address',email)
        
        try{
            const res = await axios.post(`${uri.getUSER}update.php`,params)
            if(res.data.result){

                dispatch(changeUserInfoAction({user_name:name,user_address:email}))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:"ユーザー情報の更新に失敗しました",
                    errorDetail:"ユーザー情報の更新に失敗しました" + res.data.error[0].code + res.data.error[0].message
                }))
            }

        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:"ユーザー情報の更新に失敗しました",
                errorDetail:"ユーザー情報の更新に失敗しました"
            }))
        }

    }
}

export const fetchInvitedList = () => {
    return async(dispatch,getState) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',token)

        try{
            const res = await axios.post(`${uri.getUSER}invited.php`,params)
            if(res.data.result){

                const invitedList = res.data.result
                dispatch(fetchInvitedListAction(invitedList))

            }else{
                console.log('handleError',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'招待の取得に失敗しました',
                    errorDetail:'招待の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }

        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'招待の取得に失敗しました',
                errorDetail:'招待の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
        }

    }
}

export const joinTeam = (teamId,ws) => {
    return async(dispatch,getState) => {
         //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
    
        const team_id =teamId
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)

        try{
            const res = await axios.post(`${uri.getUSER}join.php`,params)
            if(res.data.result){
                const user_id = getState().user.user_id
                const inviteInfo = JSON.stringify({
                    command:'subscribe',
                    message:user_id
                })
                ws.send(inviteInfo)
            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'招待の承諾処理に失敗しました',
                    errorDetail:'招待の承諾処理に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return;
            }
        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'招待の承諾処理に失敗しました',
                errorDetail:'招待の承諾処理に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
            return;
        }

        let TeamParams = new URLSearchParams()
        TeamParams.append('token',token)
        TeamParams.append('team_id',team_id)
        
        try{
            const res = await axios.post(`${uri.getTEAM}information.php`,TeamParams)
            if (res.data.result){
                closeWebSocket(ws)
                console.log('クローズしました')
                const team = res.data.result
                dispatch(updateTeamAction(team))
                dispatch(clearMapAction())
                dispatch(clearCardsAction())

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの情報の取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }


    }
}

export const rejectInvitation = (teamId,ws) => {
    return async(dispatch,getState) => {
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        const team_id =teamId
        let params = new URLSearchParams()
        params.append('token',token)
        params.append('team_id',team_id)

        try{
        const res = await axios.post(`${uri.getUSER}reject.php`,params)
        if(res.data.result){
            const user_id = getState().user.user_id
                const inviteInfo = JSON.stringify({
                    command:'subscribe',
                    message:user_id
                })
                ws.send(inviteInfo)
        }else{
            dispatch(setRequestErrorAction({
                errorTitle:'招待の拒否処理に失敗しました',
                errorDetail:'招待の拒否処理に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
            }))
            return;
        }
        }catch(e){
            console.log('badError',e)
            dispatch(setRequestErrorAction({
                errorTitle:'招待の拒否処理に失敗しました',
                errorDetail:'招待の拒否処理に失敗しました。通信環境の良い場所でもう一度お試しください。'
            }))
            return;
        }

}
}

export const signUp = (name,email,password) => {

    return async(dispatch,getState) => {

        let params = new URLSearchParams()
        params.append('user_name',name)
        params.append('user_address',email)
        params.append('user_password',password)

        try{
            const res = await axios.post(`${uri.getUSER}user_register.php`,params)

            if(res.data.result){
                const token = res.data.result.token
                document.cookie = encodeURIComponent(`token=${token}`)
                dispatch(push('/'))
            }else{
                let errorDetail = ""
                switch(res.data.error[0].code){
                    case "401":
                        errorDetail = "パスワードとメールアドレスに一致するユーザーが見つかりませんでした。"
                        break
                    case "450" :
                        errorDetail = "サーバの接続に失敗しました。通信環境の良い場所でもう一度実行してください。"
                        break
                    default:
                        errorDetail = "問題が発生しました。通信環境の良い場所でもう一度送信してください。"
                        break
                }
                dispatch(setRequestErrorAction({
                    errorTitle:"ログインに失敗しました",
                    errorDetail:errorDetail
                }))
                return
            }

        }catch(e){
            console.log('badError')
        }

        
    }

}

export const signIn = (email,password) => {
    return async(dispatch,getState) => {
        console.log(password)

        let params = new URLSearchParams()
        params.append('user_address',email)
        params.append('user_password',password)

        try{
            const res = await axios.post(`${uri.getUSER}login.php`,params)
            console.log(res.data)
            if(res.data.token){
                const token = res.data.token
                console.log('token',res.data.token)
                document.cookie = encodeURIComponent(`token=${token}`)
                dispatch(push('/'))
            }else{
                console.log('else',res)
                let errorDetail = ""
                switch(res.data.error[0].code){
                    case "401":
                        errorDetail = "パスワードとメールアドレスに一致するユーザーが見つかりませんでした。"
                        break
                    case "450" :
                        errorDetail = "サーバの接続に失敗しました。通信環境の良い場所でもう一度実行してください。"
                        break
                    default:
                        console.log('通過')
                        errorDetail = "問題が発生しました。通信環境の良い場所でもう一度送信してください。"
                        break
                }
                dispatch(setRequestErrorAction({
                    errorTitle:"ログインに失敗しました",
                    errorDetail:errorDetail
                }))
                return
            }
        }catch(e){
            console.log('bad通過',e)
            dispatch(setRequestErrorAction({
                errorTitle:"ログインに失敗しました",
                errorDetail:"問題が発生しました。通信環境の良い場所でもう一度送信してください。"
            }))
            return
        }

    }
}

export const tokenAuthentication = () => {

    return async(dispatch,getState) => {
        //クッキーからトークンだけ取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        //リクエストパラメータの準備
        let params = new URLSearchParams()
            params.append('token',token)

        try{
            const res = await axios.post(`${uri.getUSER}user_information.php`,params)

            if(res.data.result){
                const userInfo = res.data.result
                dispatch(autoAuthAction(userInfo))
            }else{//トークンが一致しないのでリダイレクト
                console.log('handleError',res.data)
                document.cookie = "token=; max-age=0";
                dispatch(push('/signin'))
            }

        }catch(e){
            console.log('badError',e)
        }
    }

}

export const changeTeam =(teamId,ws) => {
    return async(dispatch,getState) => {

        //クッキーからトークンだけ取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        //--------------------------------------------チームの変更------------------------------------------------------------------------------------------------
        //リクエストパラメータの準備

        let TeamParams = new URLSearchParams()
        TeamParams.append('token',token)
        TeamParams.append('team_id',teamId)
        
        try{
            const res = await axios.post(`${uri.getTEAM}information.php`,TeamParams)
            if (res.data.result){
                closeWebSocket(ws)
                console.log('クローズしました')
                const team = res.data.result
                dispatch(updateTeamAction(team))
                dispatch(clearMapAction())
                dispatch(clearCardsAction())

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの情報の取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

    }
}

export const changeMap = (map_Id) => {

    return async(dispatch,getState) => {
        //リクエストパラメータの準備
        //クッキーからトークンだけ取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        
        const team_id = getState().team.team_id//ユーザーがチームに所属しているか確認するために必用
        const map_id = map_Id
        let mapParams = new URLSearchParams()
        mapParams.append('token',token)
        mapParams.append('team_id',team_id)
        mapParams.append('map_id',map_id)
        console.log('whyFobbiden',map_id)
        try{
            const res = await axios.post(`${uri.getMAP}information.php`,mapParams)

            if(res.data.result){
                console.log('success',res.data.result)
                const mapInfo = res.data.result
                dispatch(updateMapAction(mapInfo))
                dispatch(clearCardsAction())

            }else{
                console.log('badError',res.data)
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の取得に失敗しました',
                    errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
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

        let cardsParams = new URLSearchParams()
        cardsParams.append('token',token)
        cardsParams.append('team_id',team_id)
        cardsParams.append('map_id',map_id)

        try{
            const res = await axios.post(`${uri.getMAP}cards_information.php`,cardsParams)
            if(res.data){
                const cards = res.data
                dispatch(updateCardAction(cards))
            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの取得に失敗しました',
                    errorDetail:'カードの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの取得に失敗しました',
                    errorDetail:'カードの取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }


    }

}


export const changeTeamAndMap = (teamId,mapId,ws) => {
    return async(dispatch,getState) => {
         //クッキーからトークンだけ取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        //--------------------------------------------チームの変更------------------------------------------------------------------------------------------------
        //リクエストパラメータの準備

        let TeamParams = new URLSearchParams()
        TeamParams.append('token',token)
        TeamParams.append('team_id',teamId)
        
        try{
            const res = await axios.post(`${uri.getTEAM}information.php`,TeamParams)
            if (res.data.result){

                const team = res.data.result
                closeWebSocket(ws)
                console.log('クローズしました')
                dispatch(updateTeamAction(team))
                dispatch(clearMapAction())
                dispatch(clearCardsAction())

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'選択したチームの情報の取得に失敗しました',
                    errorDetail:'選択したチームの取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

        //--------------------------------------------マップの変更------------------------------------------------------------------------------------------------
        //リクエストパラメータの準備
        const team_id = getState().team.team_id//ユーザーがチームに所属しているか確認するために必用
        const map_id = mapId
        let mapParams = new URLSearchParams()
        mapParams.append('token',token)
        mapParams.append('team_id',team_id)
        mapParams.append('map_id',map_id)

        try{
            const res = await axios.post(`${uri.getMAP}information.php`,mapParams)

            if(res.data.result){
                console.log('success',res.data.result)
                const mapInfo = res.data.result
                dispatch(updateMapAction(mapInfo))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'マップ情報の取得に失敗しました',
                    errorDetail:'マップ情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
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

        //--------------------------------------------カードの変更------------------------------------------------------------------------------------------------

        let cardsParams = new URLSearchParams()
        cardsParams.append('token',token)
        cardsParams.append('team_id',team_id)
        cardsParams.append('map_id',map_id)
        console.log('cards_information_map_id',map_id)

        try{
            const res = await axios.post(`${uri.getMAP}cards_information.php`,cardsParams)
            console.log('card_info結果',res.data)
            if(res.data){
                const cards = res.data
                console.log('information_cardsやで',res.data)
                dispatch(updateCardAction(cards))
            }else{
                console.log('errorororroororo',res.data.error)
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの取得に失敗しました',
                    errorDetail:'カードの取得に失敗しました。通信環境の良い場所でもう一度お試しください。' + res.data.error[0].code + res.data.error[0].message
                }))
                return
            }

        }catch(e){
            console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'カードの取得に失敗しました',
                    errorDetail:'カードの取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
                return
        }

    }

}