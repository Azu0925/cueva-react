import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchTeam} from '../../../reducks/team/operations'
import {fetchMap} from '../../../reducks/pMap/operations'
import {getTeam} from '../../../reducks/team/selectors'
import {getMap} from '../../../reducks/pMap/selectors'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
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
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const team = getTeam(selector)
    const team_name = team.team_name
    const team_description = team.team_description
    const team_member = team.team_member
    const map = getMap(selector)
    const map_name = map.map_name
    const map_description = map.map_description
    const parameter_top = map.axis.vaHigh
    const parameter_under = map.axis.vaLow
    const parameter_right = map.axis.vhHigh
    const parameter_left = map.axis.vhLow

    const isOpen = props.isOpen
    const doClose = props.doClose

    const [open, setOpen] = useState(false);

    useEffect(() => {
    setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if(isOpen)dispatch(fetchTeam)
    },[isOpen,team_name,team_description,team_member])
    useEffect(() => {
        if(isOpen)dispatch(fetchMap)
    },[isOpen,map_name,map_description,parameter_top,parameter_under,parameter_left,parameter_right])

    const handleCancel = () => {
    setOpen(false);
    doClose();
    };

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
                    チーム名：<br/>
                    チーム詳細:<br/>
                    チームメンバー<br/>
                
                    マップ名<br/>
                    マップ詳細<br/>
                    縦軸比較条件：↑↓
                    横軸比較条件：↑↓
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
