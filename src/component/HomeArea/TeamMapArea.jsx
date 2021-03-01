import React from 'react'
import {MapCard} from './index'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        width:'90%',
        height:'30%',
        border :'solid 1px gray',
        padding:'1rem'
    }
})

const TeamMapArea = (props) => {

    const classes = useStyles()

    return(
        <div className={classes.root}>
            <MapCard />
        </div>
    )

}

export default TeamMapArea