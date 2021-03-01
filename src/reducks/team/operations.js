import {push} from "connected-react-router";
import {fetchTeamMapsAction,changeTeamAction,updateTeamAction} from './actions';

export const fetchTeamMaps = (teamId) => {

    return async(dispatch,getState) => {

        //ここら辺に選択中チーム内のマップ名とマップidを取得する非同期処理

        const maps = getState().team.inTeamPMaps;//デモ
        dispatch(fetchTeamMapsAction(maps))
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
        console.log('deleteTeam')
    }
}

export const updateTeam = (name,detail) => {
    return async(dispatch,getState) => {

        const nextTeamInfo = {
            teamName:name,
            teamDetail:detail
        }
        dispatch(updateTeamAction(nextTeamInfo))
    }
}

export const exitTeam = () => {
    return async(dispatch,getState) => {

        console.log('退出処理')

    }
}

export const createTeam = (tamName,teamDetail,mapName,mapDetail,isCreateMap) => {
    return async(dispatch,getState) => {

        if(isCreateMap){//マップも作成

        }else{//チームのみ作成

        }
    }
}