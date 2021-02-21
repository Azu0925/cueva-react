import {push} from "connected-react-router";
import {fetchBelongTeamsAction,changeUserInfoAction,signUpAction,signInAction} from './actions';

export const fetchBelongTeams = (userId) => {

    return async(dispatch,getState) => {
        //ここら辺にチーム名取得する非同期処理
        const belongTeams = getState().user.belongTeams
        dispatch(fetchBelongTeamsAction(belongTeams))
    }

}

export const logout = () => {
    return async(dispatch,getState) => {
        console.log('ログアウト処理')
    }
}

export const withdrawal = (email,password) => {
    return async(dispatch,getState) => {
        console.log('退会処理',email,password)
    }
}

export const changeUserInfo = (name) => {
    return async(dispatch,getState) => {
        dispatch(changeUserInfoAction(name))
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
        
        //サインアップの非同期処理
        //デモ
        const userInfo = {
            userName:name,
        }
        dispatch(signUpAction(userInfo))
        dispatch(push('/'))
    }

}

export const signIn = (email,password) => {
    return async(dispatch,getState) => {
        
        const name = "非同期で取得したユーザー名"
        const userInfo = {
            userName:name,
        }
        dispatch(signInAction(userInfo))
        dispatch(push('/'))

    }
}