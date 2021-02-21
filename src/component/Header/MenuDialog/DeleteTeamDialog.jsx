import React, { useState,useEffect } from "react";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';
import {ReconfirmDialog} from './index'
import {deleteTeam} from '../../../reducks/team/operations'

const useStyles = makeStyles({
    root:{
        width:'600px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const DeleteTeamDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

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
    dispatch(deleteTeam())
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
            <DialogTitle id="form-dialog-title">下記のチームを削除します。</DialogTitle>
            <DialogContent className={classes.root}>
                <DialogContentText>
                    チーム名<br/>
                    チーム詳細<br/>
                    チーム作成日<br/>
                    チームメンバー<br/>
                    含有マップ一覧
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
    export default DeleteTeamDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
