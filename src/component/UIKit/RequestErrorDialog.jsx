import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {setRequestErrorAction} from '../../reducks/requestError/actions'
import {getRequestError} from '../../reducks/requestError/selectors'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";



const RequestErrorDialog = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    
    const [open, setOpen] = useState(false)
    const requestError = getRequestError(selector)
    const title = requestError.errorTitle
    const detail = requestError.errorDetail

    const [errorTitle,setErrorTitle] = useState("")
    const [errorDetail,setErrorDetail] = useState("")

    useEffect(() => {
        if(requestError){
            setErrorTitle(title)
            setErrorDetail(detail)
            setOpen(true)
        }
    },[title,detail])

    const handleClose = () => {
        dispatch(setRequestErrorAction(false))
        setOpen(false);
    };

    return (
    <div>
        <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{errorTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {errorDetail}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </div>
    );
    };
    export default RequestErrorDialog;

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
