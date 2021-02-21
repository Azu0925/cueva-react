import React, { useState,useEffect,useCallback } from "react";
import {useDispatch} from 'react-redux'
import {createTeam} from '../../../reducks/team/operations'
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
        width:'600px'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const CreateTeamDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [teamName,setTeamName] = useState("")
    const [teamDetail,setTeamDetail] = useState("")

    const inputTeamName = useCallback((e) => {
        setTeamName(e.target.value)
    },[])
    const inputTeamDetail = useCallback((e) => {
        setTeamDetail(e.target.value)
    },[])

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        dispatch(createTeam(teamName,teamDetail))
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
            <DialogTitle>新規チーム作成</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                    fullWidth={true}
                    label={"チーム名を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={teamName}
                    onChange={(e) => inputTeamName(e)}
                />
                <InputText
                    fullWidth={true}
                    label={"チームの説明を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={teamDetail}
                    onChange={(e) => inputTeamDetail(e)}
                />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary">
                    作成
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default CreateTeamDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
