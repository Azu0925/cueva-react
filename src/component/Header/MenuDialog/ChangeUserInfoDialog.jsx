import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {changeUserInfo} from '../../../reducks/user/operations'
import {getUserName} from '../../../reducks/user/selectors'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {InputText} from '../../UIKit'
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

const ChangeUserInfoDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const name = getUserName(selector)
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [newUserName,setNewUserName] = useState("")

    const inputNewUserName = useCallback((e) => {
        setNewUserName(e.target.value)
    },[])

    const userName = name

    useEffect(() => {
        if(isOpen){
            setNewUserName(userName)
        }
        setOpen(isOpen);
    }, [isOpen,userName]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        dispatch(changeUserInfo(newUserName))
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
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={newUserName}
                        onChange={(e) => inputNewUserName(e)}
                />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary">
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
