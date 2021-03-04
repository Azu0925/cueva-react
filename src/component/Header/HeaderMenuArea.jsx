import React,{useState,useEffect,useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {DrawerMenu} from './index'
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import DirectionsWalkOutlinedIcon from '@material-ui/icons/DirectionsWalkOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Badge from '@material-ui/core/Badge';
import {fetchTeamMaps} from '../../reducks/team/operations'
import {fetchBelongTeams} from '../../reducks/user/operations'
import {getUserId,getInvitedList} from '../../reducks/user/selectors'
import {getTeamId} from '../../reducks/team/selectors'
import {getMapId} from '../../reducks/pMap/selectors'
import {ToggleMenu} from '../../component/UIKit'
import {InviteTeamDialog,MapDetailDialog,DeleteTeamDialog,DeleteMapDialog,UpdateMapDialog,UpdateTeamDialog,ExitTeamDialog,LogoutDialog,WithdrawalDialog,ChangeUserInfoDialog,CreateTeamDialog,CreateMapDialog,InvitedListDialog} from '../../component/Header/MenuDialog'

const HeaderMenuArea = () => {
    console.log('HeaderMenu生成')
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const userId = getUserId(selector)
    let teamId = getTeamId(selector)
    let mapId = getMapId(selector)
    const invitedListLength = getInvitedList(selector).length

    //招待通知のバッジ取得。
    const [invitedCount,setInvitedCount] = useState(0)
    useEffect(() => {
        setInvitedCount(invitedListLength)//非同期で招待通知数を取得。今はデモ
    },[invitedListLength])

//////////////////////ダイアログメニューの処理///////////////////////////////////////////
    //招待ダイアログ
    const [inviteTeamOpen, setInviteTeamOpen] = useState(false);
    const handleInviteTeamOpen = () => {
        setInviteTeamOpen(true);
    };
    const handleInviteTeamClose = () => {
        setInviteTeamOpen(false);
    };
    //マップ詳細ダイアログ
    const [mapDetailOpen, setMapDetailOpen] = useState(false);
    const handleMapDetailOpen = () => {
        setMapDetailOpen(true);
    };
    const handleMapDetailClose = () => {
        setMapDetailOpen(false);
    };
    //チーム削除ダイアログ
    const [deleteTeamOpen, setDeleteTeamOpen] = useState(false);
    const handleDeleteTeamOpen = () => {
        setDeleteTeamOpen(true);
    };
    const handleDeleteTeamClose = () => {
        setDeleteTeamOpen(false);
    };
    //マップ削除ダイアログ
    const [deleteMapOpen, setDeleteMapOpen] = useState(false);
    const handleDeleteMapOpen = () => {
        setDeleteMapOpen(true);
    };
    const handleDeleteMapClose = () => {
        setDeleteMapOpen(false);
    };
    //チーム情報更新ダイアログ
    const [updateTeamOpen, setUpdateTeamOpen] = useState(false);
    const handleUpdateTeamOpen = () => {
        setUpdateTeamOpen(true);
    };
    const handleUpdateTeamClose = () => {
        setUpdateTeamOpen(false);
    };
    //マップ情報更新ダイアログ
    const [updateMapOpen, setUpdateMapOpen] = useState(false);
    const handleUpdateMapOpen = () => {
        setUpdateMapOpen(true);
    };
    const handleUpdateMapClose = () => {
        setUpdateMapOpen(false);
    };
    //チーム退会ダイアログ
    const [exitTeamOpen, setExitTeamOpen] = useState(false);
    const handleExitTeamOpen = () => {
        setExitTeamOpen(true);
    };
    const handleExitTeamClose = () => {
        setExitTeamOpen(false);
    };

    //ログアウトダイアログ
    const [logoutOpen, setLogoutOpen] = useState(false);
    const handleLogoutOpen = () => {
        setLogoutOpen(true);
    };
    const handleLogoutClose = () => {
        setLogoutOpen(false);
    };
    //退会ダイアログ
    const [withdrawalOpen, setWithdrawalOpen] = useState(false);
    const handleWithdrawalOpen = () => {
        setWithdrawalOpen(true);
    };
    const handleWithdrawalClose = () => {
        setWithdrawalOpen(false);
    };
    //ユーザー情報変更ダイアログ
    const [changeUserInfoOpen, setChangeUserInfoOpen] = useState(false);
    const handleChangeUserInfoOpen = () => {
        setChangeUserInfoOpen(true);
    };
    const handleChangeUserInfoClose = () => {
        setChangeUserInfoOpen(false);
    };

    //新規チーム作成ダイアログ
    const [createTeamOpen, setCreateTeamOpen] = useState(false);

    const handleCreateTeamOpen = () => {
        setCreateTeamOpen(true);
    };
    const handleCreateTeamClose = () => {
        setCreateTeamOpen(false);
    };
    //新規マップ作成ダイアログ
    const [createMapOpen, setCreateMapOpen] = useState(false);
    const handleCreateMapOpen = () => {
        setCreateMapOpen(true);
    };
    const handleCreateMapClose = () => {
        setCreateMapOpen(false);
    };

    //招待通知ダイアログ
    const [invitedListOpen, setInvitedListOpen] = useState(false);
    const handleInvitedListOpen = () => {
        setInvitedListOpen(true);
    };
    const handleInvitedListClose = () => {
        setInvitedListOpen(false);
    };

    //各toggleメニューの初期値を設定。（チーム非選択状態）
    const teamDialogMenus = []
    const userDialogMenus = [
        {label:"ログアウト",openFunc:handleLogoutOpen},
        {label:"退会",openFunc:handleWithdrawalOpen},
        {label:"ユーザー設定",openFunc:handleChangeUserInfoOpen}
    ]
    const createDialogMenus = [
        {label:"新規チーム作成",openFunc:handleCreateTeamOpen},
    ]

    //チーム選択かつマップ非選択
    if(teamId != ""){
        teamDialogMenus.push(
            {label:"チームに招待",openFunc:handleInviteTeamOpen},
            {label:"チーム退出",openFunc:handleExitTeamOpen},
            {label:"チームの削除【ホスト権限】",openFunc:handleDeleteTeamOpen},
            {label:"チームの変更【ホスト権限】",openFunc:handleUpdateTeamOpen},
        )
        createDialogMenus.push(
            {label:"新規マップ作成",openFunc:handleCreateMapOpen}
        )
        //チームもマップも選択
        if(mapId != ""){
            teamDialogMenus.push(
                {label:"マップ詳細",openFunc:handleMapDetailOpen},
                {label:"マップの削除【ホスト権限】",openFunc:handleDeleteMapOpen},
                {label:"マップの変更【ホスト権限】",openFunc:handleUpdateMapOpen},
            )
        }
    }



//drawerメニューの処理////////////////////////////////////////////////////////////////
    const [isOpen,setIsOpen] = useState(false)
    const handleDrawer = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'shift')){
            return;
        }
        if(!isOpen){
           // dispatch(fetchBelongTeams(userId))
            //dispatch(fetchTeamMaps(teamId))
        }
        setIsOpen(!isOpen);
    },[isOpen,setIsOpen,dispatch,userId,teamId])

    return(
        <>
            <InviteTeamDialog isOpen={inviteTeamOpen} doClose={() => handleInviteTeamClose()} />
            <MapDetailDialog isOpen={mapDetailOpen} doClose={() => handleMapDetailClose()} />
            <DeleteTeamDialog isOpen={deleteTeamOpen} doClose={() => handleDeleteTeamClose()} />
            <DeleteMapDialog isOpen={deleteMapOpen} doClose={() => handleDeleteMapClose()} />
            <UpdateTeamDialog isOpen={updateTeamOpen} doClose={() => handleUpdateTeamClose()} />
            <UpdateMapDialog isOpen={updateMapOpen} doClose={() => handleUpdateMapClose()} />
            <ExitTeamDialog isOpen={exitTeamOpen} doClose={() => handleExitTeamClose()} />

            <LogoutDialog isOpen={logoutOpen} doClose={() => handleLogoutClose()} />
            <WithdrawalDialog isOpen={withdrawalOpen} doClose={() => handleWithdrawalClose()} />
            <ChangeUserInfoDialog isOpen={changeUserInfoOpen} doClose={() => handleChangeUserInfoClose()} />

            <CreateTeamDialog isOpen={createTeamOpen} doClose={() => handleCreateTeamClose()} />
            <CreateMapDialog isOpen={createMapOpen} doClose={() => handleCreateMapClose()} />

            <InvitedListDialog isOpen={invitedListOpen} doClose={() => handleInvitedListClose()} />

            <IconButton onClick={() => handleInvitedListOpen()}>
                <Badge badgeContent={invitedCount} color="secondary">
                    <NotificationsNoneRoundedIcon />
                </Badge>
            </IconButton>
            <ToggleMenu icon={<BuildOutlinedIcon />} dialogMenus={createDialogMenus} />
            <ToggleMenu icon={<DirectionsWalkOutlinedIcon />} dialogMenus={userDialogMenus} />
            <ToggleMenu icon={<GroupAddOutlinedIcon />} dialogMenus={teamDialogMenus} />

            <IconButton onClick={(e) => handleDrawer(e)}>
                <MenuIcon />
            </IconButton>
            <DrawerMenu open={isOpen} onClose={handleDrawer} />
        </>

    )

}

export default HeaderMenuArea


{
    
}