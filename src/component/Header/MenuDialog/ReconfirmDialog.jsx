import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})


const ReconfirmDialog = (props) => {
    const classes = useStyles()
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

    const handleDecision = () => {
        props.decision()
        setOpen(false);
        doClose();
        props.parentClose()
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
            <DialogTitle id="form-dialog-title">{props.msg}</DialogTitle>
            <DialogContent>
                <DialogContentText />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button color="primary" onClick={() => handleDecision()} >
                    決定
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default ReconfirmDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
