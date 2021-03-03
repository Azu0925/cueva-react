import React, { useState,useEffect } from "react";
import {useDispatch} from 'react-redux'
import {changeTeam,changeTeamAndMap} from '../../../reducks/user/operations'
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
    const isOpen = props.isOpen
    const doClose = props.doClose
    const teamId = props.teamId

    const [open, setOpen] = useState(false);
    const [mapInfoList,setMapInfoList] = useState([])

    const demoList = [//デモ
        {mapId:"1",mapName:"test1test1"},
        {mapId:"2",mapName:"test2"},
        {mapId:"3",mapName:"test3test3test3"}
    ]

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
                        console.log('success-teamInfo',res.data.result)
                        const mapInfo = res.data.result.data
                        if(mapInfo.length == 0){
                            dispatch(changeTeam())
                            setOpen(false);
                            doClose();
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
    }, [isOpen,mapInfoList]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    }


    const handleOnClick = (mapId) => {
        dispatch(changeTeamAndMap(teamId,mapId))
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
            <DialogTitle id="form-dialog-title">編集するマップを選択してください</DialogTitle>
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
