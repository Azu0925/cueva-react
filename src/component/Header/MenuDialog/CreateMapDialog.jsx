import React, { useState,useEffect,useCallback } from "react";
import {useDispatch} from 'react-redux'
import {createMap} from '../../../reducks/pMap/operations'
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

const CreateMapDialog = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);
    const [mapName,setMapName] = useState("")
    const [mapDetail,setMapDetail] = useState("")

    const inputMapName = useCallback((e) => {
        setMapName(e.target.value)
    },[])
    const inputMapDetail = useCallback((e) => {
        setMapDetail(e.target.value)
    },[])

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

    const handleSendButton = () => {
        dispatch(createMap(mapName,mapDetail))
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
            <DialogTitle>新規マップ作成</DialogTitle>
            <DialogContent className={classes.root}>
                <InputText
                    fullWidth={true}
                    label={"ポジショニングマップ名を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={mapName}
                    onChange={(e) => inputMapName(e)}
                />
                <InputText
                    fullWidth={true}
                    label={"ポジショニングマップの説明を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={mapDetail}
                    onChange={(e) => inputMapDetail(e)}
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
    export default CreateMapDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
