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
    root:{
        width:'600px'
    }
})

const MapDetailDialog = (props) => {
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
    useEffect(() => {
        if(isOpen){
            //ここにteamIDとMAPIDを使ってチームとホストの、名前、詳細、作成日、参加ユーザー、ホストを取得
        }
    },[isOpen])
    return (
    <div>
        <Dialog
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">ポジショニングマップ詳細</DialogTitle>
            <DialogContent className={classes.root}>
                <DialogContentText>
                    チーム名<br/>
                    チーム詳細<br/>
                    チーム作成日<br/>
                    チームメンバー<br/>
                
                    マップ名<br/>
                    マップ詳細<br/>
                    マップ作成日<br/>
                    マップホスト<br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default MapDetailDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
