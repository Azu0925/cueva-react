import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {updateMap,fetchMap} from '../../../reducks/pMap/operations'
import {getMapNameAndDetail} from '../../../reducks/pMap/selectors'
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

const UpdateMapDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const map = getMapNameAndDetail(selector)
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [newName,setNewName] = useState("")
    const [newDetail,setNewDetail] = useState("")

    const [newNameErr,setNewNameErr] = useState(true)

    const inputNewName = useCallback((e) => {
        setNewName(e.target.value)
    },[])
    const inputNewDetail = useCallback((e) => {
        setNewDetail(e.target.value)
    },[])

    const name = map[0]
    const detail = map[1]

    const handleOnBlue = (e) => {
        const checkName = e.target.value
        if(!checkName || checkName === ""){
            setNewNameErr('チーム名を入力してください')
            return
        }
        setNewNameErr(false)
    }

    useEffect(() => {
        if(isOpen){
            dispatch(fetchMap())
        }
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if(isOpen){
            setNewName(name)
            setNewDetail(detail)
        }
        setOpen(isOpen);
    }, [isOpen,name,detail]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        if(!newName || newName === ""){
            setNewNameErr('マップ名を入力してください')
            return
        }
        dispatch(updateMap(newName,newDetail))
        setNewName('')
        setNewDetail('')
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
            <DialogTitle>マップの情報変更</DialogTitle>
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
                        onBlur={(e) => handleOnBlue(e)}
                />
                <ErrorMessage msg={newNameErr} />
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
                <Button onClick={() => handleSendButton()} color="primary" disabled={(newNameErr) ? true : false} >
                    変更する
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
    export default UpdateMapDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
