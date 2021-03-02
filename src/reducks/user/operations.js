import {push} from "connected-react-router";
import {fetchBelongTeamsAction,changeUserInfoAction,autoAuthAction} from './actions';
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

export const fetchBelongTeams = () => {
    return async(dispatch) => {

        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))
        //パラメータの準備
        let params = new URLSearchParams()
        params.append('token',params)
        
        try{
            const res = await axios.post(`${uri.getUSER}information.php`,params)
            if(res.data.result){
                const belongTeamsInfo = res.data.result.team_info
                dispatch(fetchBelongTeamsAction(belongTeamsInfo))

            }else{
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
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

export const logout = () => {
    return async(dispatch,getState) => {
        
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',params)

        try{
            const res = await axios.post(`${uri.getUSER}logout.php`,params)
            
            if(res.data.result){
                document.cookie = "token=; max-age=0";
                dispatch(push('/signin'))
            }else{
                console.log('handleError',res.data.error)
            }
        }catch(e){
            console.log('badError')
        }
    }
}

export const withdrawal = (email,password) => {
    return async(dispatch,getState) => {
        //トークンの取得
        const token = getToken();
        if(token === "")dispatch(push('/signin'))

        let params = new URLSearchParams()
        params.append('token',params)

        try{
            const res = await axios.post(`${uri.getUSER}delete.php`,params)
            
            if(res.data.result){
                document.cookie = "token=; max-age=0";
                dispatch(push('/signup'))
            }else{
                console.log('handleError',res.data.error)
            }
        }catch(e){
            console.log('badError')
        }
    }
}

export const changeUserInfo = (name,email) => {
    return async(dispatch,getState) => {

        const newUserInfo = {
            name:name,
            email:email
        }

        dispatch(changeUserInfoAction(newUserInfo))
    }
}

export const joinTeam = (teamId) => {
    return async(dispatch,getState) => {
        console.log('joinTeam',teamId)//userIdとteamIdでチーム参加非同期処理
    }
}

export const rejectInvitation = (teamId) => {
    return async(dispatch,getState) => {
        console.log('rejectTeam',teamId)//userIdとteamIdで招待拒否非同期処理
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
                        console.log('通過')
                        errorDetail = "問題が発生しました。通信環境の良い場所でもう一度送信してください。"
                        break
                }
                dispatch(setRequestErrorAction({
                    errorTitle:"ログインに失敗しました",
                    errorDetail:errorDetail
                }))
            }
        }catch(e){
            console.log('bad通過')
            dispatch(setRequestErrorAction({
                errorTitle:"ログインに失敗しました",
                errorDetail:"問題が発生しました。通信環境の良い場所でもう一度送信してください。"
            }))
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
            const res = await axios.post(`${uri.getUSER}information.php`,params)

            if(res.data.result){
                console.log('success',res.data.result)
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