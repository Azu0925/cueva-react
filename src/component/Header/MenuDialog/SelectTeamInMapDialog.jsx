import React, { useState,useEffect,useContext } from "react";
import {WebSocketContext} from '../../../templete/Main'
import {useDispatch,useSelector} from 'react-redux'
import {changeTeam,changeTeamAndMap} from '../../../reducks/user/operations'
import {getTeamId} from '../../../reducks/team/selectors'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';
import {setRequestErrorAction} from '../../../reducks/requestError/actions'
import {push} from "connected-react-router";
import axios from 'axios'


const useStyles = makeStyles({
    root:{
        width:'600px'
    }
})

const SelectTeamInMapDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const ws = useContext(WebSocketContext);
    const isOpen = props.isOpen
    const doClose = props.doClose
    const teamId = props.selectedTeamId

    const [open, setOpen] = useState(false);
    const [mapInfoList,setMapInfoList] = useState([])


    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if(isOpen){
            //開かれた＆描画後に選択されたチームIDのチームが含有するマップを全件取得。チームとマップを切り替えるわけではないので、storeは更新せずuseEffectで直接取得
            //パラメータの準備
            //トークンの取得
            let token = "";
            const cookies = document.cookie.split(';')
            for(const c of cookies){
                const cookie = c.split('%3D')
                if(cookie[0] == 'token') token = cookie[1]
            }
            if(token === "")dispatch(push('/signin'))

            let params = new URLSearchParams()
            params.append('token',token)
            params.append('team_id',teamId)

            try{
                (async() => {
                    const res = await axios.post(`http://localhost:80/cueva/src/team_info/information.php`,params)
                    if(res.data.result){
                        console.log('success-teamInfo',res.data.result.map_info)
                        const mapInfo = res.data.result.map_info
                        if(mapInfo.length == 0){
                            dispatch(changeTeam(teamId,ws))
                            setTimeout(() => {
                                props.setSelectedTeamId('')
                                setOpen(false);
                                doClose();
                            }, 2000);
                            
                        }else{
                            setMapInfoList(mapInfo)
                        }
                        
                    }else{
                        dispatch(setRequestErrorAction({
                            errorTitle:'チーム情報の取得に失敗しました',
                            errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                        }))
                    }
                })()

            }catch(e){
                console.log('badError',e)
                dispatch(setRequestErrorAction({
                    errorTitle:'チーム情報の取得に失敗しました',
                    errorDetail:'チーム情報の取得に失敗しました。通信環境の良い場所でもう一度お試しください。'
                }))
            }
        }
    }, [isOpen]);

    const handleCancel = () => {
        setMapInfoList([])
        props.setSelectedTeamId('')
        setOpen(false);
        doClose();
    }


    const handleOnClick = (mapId) => {
        dispatch(changeTeamAndMap(teamId,mapId,ws))
        setMapInfoList([])
        props.setSelectedTeamId('')
        setOpen(false);
        doClose();
    }

    return (
    <div>
        <Dialog
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{/*}編集するマップを選択してください{*/}{props.selectedTeamId}</DialogTitle>
            <DialogContent className={classes.root}>
                <List>
                    {mapInfoList.length > 0 && (
                        mapInfoList.map((mapInfo,i) => (
                            <ListItem key={i} onClick={() => handleOnClick(mapInfo.map_id)} button>
                                <DialogContentText>{mapInfo.map_name}</DialogContentText>
                            </ListItem>
                        ))
                        ) }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default SelectTeamInMapDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
    });
