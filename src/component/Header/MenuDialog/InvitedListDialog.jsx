import React, { useState,useEffect } from "react";
import {useDispatch} from 'react-redux'
import {joinTeam,rejectInvitation} from '../../../reducks/user/operations'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        width:'600px'
    },
    invite:{
        display:'flex',
        justifyContent:'space-between',
        borderBottom:'solid 1px gray'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'flex-start'
    }
})

const InvitedListDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [invitedList,setInvitedList] = useState([])

    const demoList = [//デモ
        {teamId:"1",teamName:"test1test1"},
        {teamId:"2",teamName:"test2"},
        {teamId:"3",teamName:"test3test3test3"}
    ]

    useEffect(() => {
        if(isOpen){
            //ここにユーザーIDを使って招待リストを取得非同期
            setInvitedList(demoList)
        }
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    }

    const handleJoinButton = (teamId) => {
        dispatch(joinTeam(teamId))
        setOpen(false);
        doClose();
    }

    const handleRejectButton = (teamId) => {
        dispatch(rejectInvitation(teamId))
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
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">ポジショニングマップ詳細</DialogTitle>
            <DialogContent className={classes.root}>
                <List>
                    {invitedList.length > 0 && (
                        invitedList.map((invite,i) => (
                            <ListItem className={classes.invite} key={i}>
                                <div className={classes.buttonGroup}>
                                    <Button color="primary" onClick={() => handleJoinButton(invite.teamId)}>参加</Button>
                                    <Button color="primary" onClick={() => handleRejectButton(invite.teamId)}>拒否</Button>
                                </div>
                                <DialogContentText>{invite.teamName}</DialogContentText>
                            </ListItem>
                        ))
                    ) }
                </List>
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
    export default InvitedListDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
