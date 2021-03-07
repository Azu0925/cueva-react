import React from 'react'
import {useSelector} from 'react-redux'
import {getTeamName} from '../../reducks/team/selectors'
import {getMapName} from '../../reducks/pMap/selectors'
import {getUserName,getUserId} from '../../reducks/user/selectors'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => {

})

const UserDetailArea = () => {
    const selector = useSelector(state => state)
    const classes = useStyles()

    const team_name = (getTeamName(selector) === "") ? "未選択" : getTeamName(selector)
    const map_name = (getMapName(selector) === "" ) ? "未選択" : getMapName(selector)
    const user_id = getUserId(selector)
    const user_name = getUserName(selector)

    return(
        <Paper elevation={3}>
            {team_name}
            {map_name}
            {user_id}
            {user_name}
        </Paper>
    )
}

export default UserDetailArea