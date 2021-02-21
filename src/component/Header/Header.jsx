import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/styles';
import {HeaderMenuArea} from './index'

const useStyles = makeStyles({
    tool:{
        display:'flex',
        justifyContent:'flex-end',
    }
})


const Header = () => {
    const classes = useStyles()
    const IsSignedIn = true;//selectorで参照してサインインしてるかどうか。今は仮でtrue

        return (
            <AppBar>
                <Toolbar className={classes.tool}>

                    {IsSignedIn && (
                        <HeaderMenuArea />
                    )}
                </Toolbar>
            </AppBar>
        )

}

export default Header