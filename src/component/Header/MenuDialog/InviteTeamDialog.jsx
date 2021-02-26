import React, { useState,useEffect,useCallback } from "react";
import {useDispatch} from 'react-redux'
import {inviteTeam} from '../../../reducks/team/operations'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {InputText,ErrorMessage} from '../../UIKit'
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

const InviteTeamDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [userId,setUserId] = useState("")

    const [userIdErr,setUserIdErr] = useState(true)

    const inputUserId = useCallback((e) => {
        setUserId(e.target.value)
    },[])

    const handleOnBlur = (e) => {
        const id = e.target.value
        if(!id || id === ""){
            setUserIdErr('招待するユーザーのIDを入力してください')
            return
        }
        setUserIdErr(false)
    }

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        if(!userId || userId === ""){
            console.log('通過')
            setUserIdErr('招待するユーザーのIDを入力してください')
            return
        }
        dispatch(inviteTeam(userId))
        setUserId('')
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
            <DialogTitle>チーム招待</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                        fullWidth={true}
                        label={"招待するユーザーのユーザーIDを入力してください。"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={userId}
                        onChange={(e) => inputUserId(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                    <ErrorMessage msg={userIdErr} />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary" disabled={(userIdErr) ? true : false}>
                    招待メッセージを送信
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default InviteTeamDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
