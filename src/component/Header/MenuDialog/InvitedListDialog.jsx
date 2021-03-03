import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {joinTeam,rejectInvitation,fetchInvitedList} from '../../../reducks/user/operations'
import {getInvitedList} from '../../../reducks/user/selectors'
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
    const selector = useSelector(state => state)
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);

    const demoList = [//デモ
        {teamId:"1",teamName:"test1test1"},
        {teamId:"2",teamName:"test2"},
        {teamId:"3",teamName:"test3test3test3"}
    ]

    const invitedList = getInvitedList(selector)

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if(isOpen){
            dispatch(fetchInvitedList())
        }
        }, [isOpen,invitedList]);


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
            <DialogTitle id="form-dialog-title">あなたへの招待一覧</DialogTitle>
            <DialogContent className={classes.root}>
                <List>
                    {invitedList.length > 0 && (
                        invitedList.map((invite,i) => (
                            <ListItem className={classes.invite} key={i}>
                                <div className={classes.buttonGroup}>
                                    <Button color="primary" onClick={() => handleJoinButton(invite.team_id)}>参加</Button>
                                    <Button color="primary" onClick={() => handleRejectButton(invite.team_id)}>拒否</Button>
                                </div>
                                <DialogContentText>{invite.team_name}</DialogContentText>
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
