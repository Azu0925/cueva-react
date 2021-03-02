import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getBelongTeams} from '../../reducks/user/selectors'
import {getInTeamMaps,getTeamId} from '../../reducks/team/selectors'
import {getMapId} from '../../reducks/pMap/selectors'
import {fetchBelongTeams} from '../../reducks/user/operations'
import {changeTeam} from '../../reducks/team/operations'
import {changeMap,fetchMap} from '../../reducks/pMap/operations'
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
    const open = props.open
    const belongTeams = getBelongTeams(selector)
    const inTeamMaps = getInTeamMaps(selector)
    const teamId = getTeamId(selector)
    const mapId = getMapId(selector)

    const  handleAnotherTeam = (teamId) => {
        dispatch(changeTeam(teamId))
    }
    const handleAnotherMap = (mapId) => {
        dispatch(changeMap(mapId))
    }
    
    useEffect(() => {
        if(open){
            dispatch(fetchBelongTeams())
            if(teamId && mapId)dispatch(fetchMap())
        }

    },[open,belongTeams,inTeamMaps])

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