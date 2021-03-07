import React from 'react'
import {useSelector} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/styles';
import {getIsSignedIn} from '../../reducks/user/selectors'
import {getTeamName} from '../../reducks/team/selectors'
import {getMapName} from '../../reducks/pMap/selectors'
import {getUserName,getUserId} from '../../reducks/user/selectors'
import {HeaderMenuArea, HeaderLogoArea} from './index';

const useStyles = makeStyles({
    headerColor: {
        backgroundColor: '#ffa64d'
    },
    contents: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tool:{
        display:'flex'
    },
    detail:{
        margin:0,
        padding:0
    }
})


const Header = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)

    let IsSignedIn = getIsSignedIn(selector)
    const team_name = (getTeamName(selector) === "") ? "未選択" : getTeamName(selector)
    const map_name = (getMapName(selector) === "" ) ? "未選択" : getMapName(selector)
    const user_id = getUserId(selector)
    const user_name = getUserName(selector)
    
        return (
            <AppBar className={classes.headerColor}>
                <Toolbar className={classes.contents}>
                    <HeaderLogoArea className={classes.logo} />
                    <div>
                    <p className={classes.detail}>あなたのID:{user_id}</p>
                        <p className={classes.detail}>あなたの名前：{user_name}</p>
                    </div>
                    <div>
                        <p className={classes.detail}>選択中チーム名：{team_name}</p>
                        <p className={classes.detail}>選択中マップ名:{map_name}</p>
                    </div>
                    <div className={classes.tool}>
                        {IsSignedIn && (//サインインしていないなら各種ツールは全て使用不可にする
                            <HeaderMenuArea />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        )

}

export default Header