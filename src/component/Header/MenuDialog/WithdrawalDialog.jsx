import React, { useState,useEffect,useCallback,useContext } from "react";
import {WebSocketContext} from '../../../templete/Main'
import {useDispatch} from 'react-redux'
import {withdrawal} from '../../../reducks/user/operations'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import {InputText,ErrorMessage} from '../../UIKit'
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
    const ws = useContext(WebSocketContext);

    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

    const [open, setOpen] = useState(false);
    /*
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [emailErr,setEmailErr] = useState(true)
    const [passwordErr,setPasswordErr] = useState(true)

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[])
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[])

    const handleOnblurOfEmail = (e) => {
        const checkEmail = e.target.value

        if(!checkEmail || checkEmail === ""){
            setEmailErr('メールアドレスを入力してください')
        }else if(!reg.test(checkEmail)){
            setEmailErr('正しい表記で入力してください')
        }else setEmailErr(false)
    }

    const handleOnblurOfPassword = (e) => {
        const checkPassword = e.target.value
        
        if(checkPassword === "" || !checkPassword){
            setPasswordErr('パスワードを入力してください')
        }else if(checkPassword.length < 8){
            setPasswordErr('パスワードは8桁以上で設定してください')
        }else if(checkPassword.length > 30){
            setPasswordErr('パスワードは30桁以内で入力してください')
        }else setPasswordErr(false)
    }*/

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
/* 
    if(!email || email === ""){
        setEmailErr('メールアドレスを入力してください')
        return
    }else if(!reg.test(email)){
        setEmailErr('正しい表記で入力してください')
        return
    }else if(password === "" || !password){
        setPasswordErr('パスワードを入力してください')
        return
    }else if(password.length < 8){
        setPasswordErr('パスワードは8桁以上で設定してください')
        return
    }else if(password.length > 30){
        setPasswordErr('パスワードは30桁以内で入力してください')
        return
    }
    setEmail('')
    setPassword('')
    */
    setReconfirmOpen(true);
    
};
const handleReconfirmClose = () => {
    setReconfirmOpen(false);
};

//削除自体の非同期処理を関数で作成して確認ダイアログに渡す。

const decision = () => {
    dispatch(withdrawal(ws))
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
                {/*}
                <InputText
                    fullWidth={true}
                    label={"メールアドレスを入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={email}
                    onChange={(e) => inputEmail(e)}
                    onBlur={(e) => handleOnblurOfEmail(e)}
                />
                <ErrorMessage msg={emailErr} />
                <InputText
                    fullWidth={true}
                    label={"パスワードを入力してください"}
                    multiline={false}
                    required={true}
                    rows={1}
                    type={"password"}
                    value={password}
                    onChange={(e) => inputPassword(e)}
                    onBlur={(e) => handleOnblurOfPassword(e)}
                />
                <ErrorMessage msg={passwordErr} />
    {*/}    
                <DialogContentText>
                    ユーザー情報を完全に削除して退会します。
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleReconfirmOpen()} color="primary" /*disabled={(emailErr || passwordErr) ? true : false}*/>
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
