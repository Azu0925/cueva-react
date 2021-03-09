import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {TeamMapArea} from '../component/HomeArea'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        display: 'flex',
        margin: '0 auto',
        justifyContent: 'center',
        width:'90vw',
        height:'90vh',
        padding:'5rem 3rem'
    }
})

const Home = () => {
    const classes = useStyles()


    return(
        <Paper elevation={7} className={classes.root}>
            <TeamMapArea />
        </Paper>
    )
}

export default Home

/*
 <Paper elevation={7} className={classes.wrapper}>

            <div className={classes.mapListArea}>
                <Paper elevation={7} className={classes.mapCard}>
                    <p className={classes.mapTitle}>マップタイトル</p>
                    <p className={classes.mapDetail}>マップ詳細</p>
                </Paper>
            </div>

        </Paper>
*/