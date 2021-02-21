import React, { useState,useEffect,useCallback } from "react";
import {useDispatch} from 'react-redux'
import {withdrawal} from '../../../reducks/user/operations'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {InputText} from '../../UIKit'
import {ReconfirmDialog} from './index'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        width:'500px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const WithdrawalDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[])
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[])

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

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
    dispatch(withdrawal(email,password))
}

    return (
    <div>
        <Dialog
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
        keepMounted
        >
            <DialogTitle>退会</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                    fullWidth={true}
                    label={"メールアドレスを入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={email}
                    onChange={(e) => inputEmail(e)}
                />
                <InputText
                    fullWidth={true}
                    label={"パスワードを入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"password"}
                    value={password}
                    onChange={(e) => inputPassword(e)}
                />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleReconfirmOpen()} color="primary">
                    決定
                </Button>
            </DialogActions>
        </Dialog>
        <ReconfirmDialog
            isOpen={reconfirmOpen}
            doClose={() => handleReconfirmClose()}
            parentClose={handleCancel}
            decision={decision}
            msg={'本当に退会しますか？'}
        />
    </div>
    );
    };
    export default WithdrawalDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
