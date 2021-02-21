import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {updateTeam} from '../../../reducks/team/operations'
import {getTeam} from '../../../reducks/team/selectors'
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

const UpdateTeamDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const team = getTeam(selector)
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [newName,setNewName] = useState("")
    const [newDetail,setNewDetail] = useState("")

    const inputNewName = useCallback((e) => {
        setNewName(e.target.value)
    },[])
    const inputNewDetail = useCallback((e) => {
        setNewDetail(e.target.value)
    },[])

    const name = team.teamName
    const detail =team.teamDetail

    useEffect(() => {
        if(isOpen){
            setNewName(name)
            setNewDetail(detail)
        }
        setOpen(isOpen);
    }, [isOpen,name,detail]);

    /*useEffect(() => {
        
    },[newName,newDetail])*/

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        dispatch(updateTeam(newName,newDetail))
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
            <DialogTitle>チームの情報変更</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                        fullWidth={true}
                        label={"チーム名"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={newName}
                        onChange={(e) => inputNewName(e)}
                />
                <InputText
                        fullWidth={true}
                        label={"チーム詳細"}
                        multiline={true}
                        required={true}
                        rows={3}
                        type={"text"}
                        value={newDetail}
                        onChange={(e) => inputNewDetail(e)}
                />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleCancel} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary">
                    変更する
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
    export default UpdateTeamDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
