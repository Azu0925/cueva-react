import React, { useState,useEffect,useContext } from "react";
import {useDispatch} from 'react-redux'
import {logout} from '../../../reducks/user/operations'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';
import {WebSocketContext} from '../../../templete/Main'
import {test} from '../../../reducks/team/operations'

const useStyles = makeStyles({
    root:{
        width:'500px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const LogoutDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose
    
    const ws = useContext(WebSocketContext)

    const [open, setOpen] = useState(false);

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        dispatch(logout(ws))
        setOpen(false);
        doClose();
    }

    const wsTest = () => {
        dispatch(test(ws))
    }

    return (
    <div>
        <Dialog
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
        keepMounted
        >
            <DialogTitle>ログアウトします</DialogTitle>
            <DialogContent className={classes.root}>
                ログアウトします
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary">
                    決定
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default LogoutDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
