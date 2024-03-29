import React, { useState,useEffect,useContext } from "react";
import {WebSocketContext} from '../../../templete/Main'
import {useDispatch,useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';
import {ReconfirmDialog} from './index'
import {deleteMap,fetchMap} from '../../../reducks/pMap/operations'
import {getMapNameAndDetail} from '../../../reducks/pMap/selectors'

const useStyles = makeStyles({
    root:{
        width:'600px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const DeleteMapDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const ws = useContext(WebSocketContext);

    const map = getMapNameAndDetail(selector)
    const map_name = map[0]
    const map_description = map[1]
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if(isOpen)dispatch(fetchMap())
    },[isOpen,map_name,map_description])

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };
    useEffect(() => {
        if(isOpen){
            //ここにstoreのteamIDを使って削除対象のteamの詳細を取得。
        }
    },[isOpen])
    
///////////////////確認ダイアログの処理/////////////////
const [reconfirmOpen, setReconfirmOpen] = useState(false);
const handleReconfirmOpen = () => {
    setReconfirmOpen(true);
};
const handleReconfirmClose = () => {
    setReconfirmOpen(false);
};

//削除自体の非同期処理を関数で作成して確認ダイアログに渡す。

const decision = () => {
    dispatch(deleteMap(ws))
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
            <DialogTitle id="form-dialog-title">下記のポジショニングマップを削除します。</DialogTitle>
            <DialogContent className={classes.root}>
                <DialogContentText>
                    マップ名：{map_name}<br/>
                    マップ詳細：{map_description}<br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button color="primary" onClick={() => handleReconfirmOpen()} >
                    決定
                </Button>
            </DialogActions>
        </Dialog>
        <ReconfirmDialog
            isOpen={reconfirmOpen}
            doClose={() => handleReconfirmClose()}
            parentClose={handleCancel}
            decision={decision}
            msg={'本当に削除しますか？'}
        />
    </div>
    );
    };
    export default DeleteMapDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
