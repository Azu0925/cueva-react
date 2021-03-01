import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {createTeam} from '../../reducks/team/operations'
import {getBelongTeamInfoLength} from '../../reducks/user/selectors'
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {InputText,ErrorMessage} from '../UIKit'
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

const CreateTeamDialog = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    
    const belongTeamLength = getBelongTeamInfoLength(selector)
    const [open, setOpen] = useState(false)
    const [teamName,setTeamName] = useState("")
    const [teamDetail,setTeamDetail] = useState("")

    const [mapName,setMapName] = useState("")
    const [mapDetail,setMapDetail] = useState("")

    const [isCreateMap,setIsCreateMap] = useState(true)

    const [teamNameErr,setTeamNameErr] = useState(true)
    const [mapNameErr,setMapNameErr] = useState(true)

    const inputTeamName = useCallback((e) => {
        setTeamName(e.target.value)
    },[])
    const inputTeamDetail = useCallback((e) => {
        setTeamDetail(e.target.value)
    },[])

    const inputMapName = useCallback((e) => {
        setMapName(e.target.value)
    },[])
    const inputMapDetail = useCallback((e) => {
        setMapDetail(e.target.value)
    },[])

    const changeIsCreateMap = useCallback(() => {
        setIsCreateMap(prevState => !prevState)
        console.log('変更完了')
    },[])
    console.log('check',isCreateMap)

    const handleOnBlurOfTeam = (e) => {
        const name = e.target.value
        if(!name || name === ""){
            setTeamNameErr('チーム名を入力してください')
            return
        }
        setTeamNameErr(false)
    }
    const handleOnBlurOfMap = (e) => {
        const name = e.target.value
        if(!name || name === ""){
            setMapNameErr('マップ名を入力してください')
            return
        }
        setMapNameErr(false)
    }

    const handleDisabledOfButton = () => {
        if(isCreateMap) return (teamNameErr || mapNameErr) ? true : false
        return (teamNameErr) ? true : false
    }


    useEffect(() => {
        if(belongTeamLength === 0){
            setOpen(true)
        }
    },[belongTeamLength])

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendButton = () => {
        if(!teamName || teamName === ""){
            setTeamNameErr('チーム名を入力してください')
            if(!mapName || mapName === "") setMapNameErr('チーム名を入力してください')
            return
        }

        dispatch(createTeam(teamName,teamDetail,mapName,mapDetail,isCreateMap))
        setTeamName('')
        setTeamDetail('')
        setMapName('')
        setMapDetail('')
        setOpen(false);
    }

    return (
    <div>
        <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">チームを作成しましょう</DialogTitle>
            <DialogContent>
                <InputText
                    fullWidth={true}
                    label={"チーム名を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={teamName}
                    onChange={(e) => inputTeamName(e)}
                    onBlur={(e) => handleOnBlurOfTeam(e)}
                />
                <ErrorMessage msg={teamNameErr} />
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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isCreateMap}
                            onChange={() => changeIsCreateMap()}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label="上記チームにマップを追加して作成"
                    labelPlacement="end"
                />

                <InputText
                    fullWidth={true}
                    label={"マップ名を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={mapName}
                    disabled={!isCreateMap}
                    onChange={(e) => inputMapName(e)}
                    onBlur={(e) => handleOnBlurOfMap(e)}
                />
                {isCreateMap && (
                    <ErrorMessage msg={mapNameErr} />
                )}
                <InputText
                    fullWidth={true}
                    label={"マップの説明を入力してください"}
                    multiline={true}
                    required={true}
                    rows={1}
                    type={"text"}
                    value={mapDetail}
                    disabled={!isCreateMap}
                    onChange={(e) => inputMapDetail(e)}
                />
            </DialogContent>
            <DialogActions className={classes.buttonGroup} >
                <Button onClick={handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={() => handleSendButton()} color="primary" disabled={handleDisabledOfButton()} >
                    作成
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
    };
    export default CreateTeamDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
