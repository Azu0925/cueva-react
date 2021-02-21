import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    root:{
        fontSize:'1.5rem',
        width:'90%'
    }
})

const CompleteButton = (props) => {

const classes = useStyles();

return(
    <Button
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}
        className={classes.root}
        size={props.size}
        disabled={props.disabled}
    >
        {props.label}
    </Button>

)

}
export default CompleteButton;