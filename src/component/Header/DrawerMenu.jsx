import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getBelongTeams,getBelongTeamsInfo} from '../../reducks/user/selectors'
import {getInTeamMaps,getTeamId,getMapInfo} from '../../reducks/team/selectors'
import {getMapId} from '../../reducks/pMap/selectors'
import {fetchBelongTeams} from '../../reducks/user/operations'
import {changeMap,fetchMap} from '../../reducks/pMap/operations'
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/styles";
import {SelectTeamInMapDialog} from './MenuDialog'

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
    const belongTeams = getBelongTeams(selector)//テストデータを取得
    const inTeamMaps = getInTeamMaps(selector)//テストデータを取得
    const belongTeamsInfo = getBelongTeamsInfo(selector)
    const mapInfo = getMapInfo(selector)
    const teamId = getTeamId(selector)
    const mapId = getMapId(selector)

    const [selectMapOpen,setSelectMapOpen] = useState(false)
    const handleSelectMapClose = () => {
        setSelectMapOpen(false)
    }

    const  handleAnotherTeam = (teamId) => {
        setSelectMapOpen(true)
    }
    const handleAnotherMap = (mapId) => {
        dispatch(changeMap(mapId))
    }
    
    useEffect(() => {
        if(open){
            dispatch(fetchBelongTeams())
            if(teamId && mapId) dispatch(fetchMap())
        }

    },[open,belongTeamsInfo,mapInfo])

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
            チーム一覧
        <List component="nav">
            {belongTeamsInfo.map((team,i) => (
                <ListItem key={i} onClick={() => handleAnotherTeam(team.id)} button>
                    <ListItemText primary={team.name} />
                </ListItem>
            ))}
        </List>
        <Divider />
            マップ一覧
        <List component="nav">
            {mapInfo.map((map,i) => (
                <ListItem key={i} onClick={() => handleAnotherMap(map.id)} button>
                    <ListItemText primary={map.name} />
                </ListItem>
            ))}
        </List>

        <SelectTeamInMapDialog isOpen={selectMapOpen} doClose={() => handleSelectMapClose()} />
        </Drawer>
    )

}

export default DrawerMenu