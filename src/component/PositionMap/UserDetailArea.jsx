import React from 'react'
import {useSelector} from 'react-redux'
import {getTeamName} from '../../reducks/team/selectors'
import {getMapName} from '../../reducks/pMap/selectors'
import {getUserName,getUserId} from '../../reducks/user/selectors'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        margin: '0 0 15px 0'
    },
    info: {
        padding: '20px'
    }
});

const UserDetailArea = () => {
    const selector = useSelector(state => state)
    const classes = useStyles()

    const team_name = (getTeamName(selector) === "") ? "未選択" : getTeamName(selector)
    const map_name = (getMapName(selector) === "" ) ? "未選択" : getMapName(selector)
    const user_id = getUserId(selector)
    const user_name = getUserName(selector)

    return(
        <div className={classes.root}>
            <Paper elevation={3}>
                <div className={classes.info}>
                    <p>チーム名：{team_name}</p>
                    <p>マップ名：{map_name}</p>
                    <p>ユーザーID:{user_id}</p>
                    <p>ユーザー名：{user_name}</p>
                </div>
            </Paper>
        </div>
    )
}

export default UserDetailArea