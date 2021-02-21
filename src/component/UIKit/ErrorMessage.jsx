import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        fontSize:'0.75rem',
        color:'red',
        marginBottom:0,
        paddingBottom:0
    }
})

const ErrorMessage = (props) => {
    const classes = useStyles()
    const msg = props.msg

    return(
        <>
        {msg && (
            <p className={classes.root}>
                {msg}
            </p>
        )}
        </>
        
    )

}

export default ErrorMessage