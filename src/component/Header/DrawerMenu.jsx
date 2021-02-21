import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getBelongTeams} from '../../reducks/user/selectors'
import {getInTeamMaps} from '../../reducks/team/selectors'
import {changeTeam} from '../../reducks/team/operations'
import {changeMap} from '../../reducks/pMap/operations'
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    drawerPaper:{
        width:'25VW'
    }
})

const DrawerMenu = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const {container} = props

    const belongTeams = getBelongTeams(selector)
    const inTeamMaps = getInTeamMaps(selector)
    
    const  handleAnotherTeam = (teamId) => {
        dispatch(changeTeam(teamId))
    }
    const handleAnotherMap = (mapId) => {
        dispatch(changeMap(mapId))
    }

    return(
        <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
        >

        <List component="nav">
            {belongTeams.map((team,i) => (
                <ListItem key={i} onClick={() => handleAnotherTeam(team.id)} button>
                    <ListItemText primary={team.name} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List component="nav">
            {inTeamMaps.map((map,i) => (
                <ListItem key={i} onClick={() => handleAnotherMap(map.id)} button>
                    <ListItemText primary={map.name} />
                </ListItem>
            ))}
        </List>


        </Drawer>
    )

}

export default DrawerMenu