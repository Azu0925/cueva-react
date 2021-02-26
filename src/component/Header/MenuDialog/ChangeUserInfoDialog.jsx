import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {changeUserInfo} from '../../../reducks/user/operations'
import {getUserName,getUserEmail} from '../../../reducks/user/selectors'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {InputText,ErrorMessage} from '../../UIKit'
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
    root:{
        width:'500px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const ChangeUserInfoDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const name = getUserName(selector)
    const email = getUserEmail(selector)
    const isOpen = props.isOpen
    const doClose = props.doClose

    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

    const [open, setOpen] = useState(false);
    const [newUserName,setNewUserName] = useState("")
    const [newUserEmail,setNewUserEmail] = useState("")

    const [newUserNameErr,setNewUserNameErr] = useState(true)
    const [newUserEmailErr,setNewUserEmailErr] = useState(true)

    const inputNewUserName = useCallback((e) => {
        setNewUserName(e.target.value)
    },[])
    const inputNewUserEmail = useCallback((e) => {
        setNewUserEmail(e.target.value)
    },[])

    const handleOnblurOfName = (e) => {
        const name = e.target.value
        if(!name || name === ""){
            setNewUserNameErr('ユーザー名を入力してください')
            return
        }
        setNewUserNameErr(false)
    }

    const handleOnblurOfEmail = (e) => {
        const email = e.target.value
        if(!email || email === ""){
            setNewUserEmailErr('メールアドレスを入力してください')
        }else if(!reg.test(email)){
            setNewUserEmailErr('正しい表記で入力してください')
        }else setNewUserEmailErr(false)
    }

    useEffect(() => {
        if(isOpen){
            setNewUserName(name)
            setNewUserEmail(email)
        }
        setOpen(isOpen);
    }, [isOpen,name,email]);

    const handleCancel = () => {
        setOpen(false);
        doClose();
    };

    const handleSendButton = () => {
        if(!newUserName || newUserName === ""){
            setNewUserNameErr('ユーザー名を入力してください')
            return
        }else if(!newUserEmail || newUserEmail === ""){
            setNewUserNameErr('ユーザー名を入力してください')
            return
        }else if(!reg.test(newUserEmail)){
            setNewUserEmailErr('正しい表記で入力してください')
            return
        }
        dispatch(changeUserInfo(newUserName,newUserEmail))
        setNewUserName('')
        setNewUserEmail('')
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
        >
            <DialogTitle>ユーザー情報の変更</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                        fullWidth={true}
                        label={"ユーザー名"}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={newUserName}
                        onChange={(e) => inputNewUserName(e)}
                        onBlur={(e) => handleOnblurOfName(e)}
                />
                <ErrorMessage msg={newUserNameErr} />
                <InputText
                        fullWidth={true}
                        label={"メールアドレス"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={newUserEmail}
                        onChange={(e) => inputNewUserEmail(e)}
                        onBlur={(e) => handleOnblurOfEmail(e)}
                />
                <ErrorMessage msg={newUserEmailErr} />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary" disabled={(newUserNameErr || newUserEmailErr) ? true : false}>
                    ユーザー情報を変更
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
    export default ChangeUserInfoDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
