import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        width:'20%',
        height:'100%',
        padding:'1rem',
    },
    mapTitle:{
        textAlign:'center'
    },
    mapDetail:{
        fontSize:'0.6rem'
    }
})


const MapCard = (props) => {
    const classes = useStyles()

    
    return(
        <Paper elevation={3} className={classes.root}>
            <p className={classes.mapTitle}>マップタイトル</p>
            <p className={classes.mapDetail}>マップ詳細</p>
        </Paper>
    )

}
export default MapCard