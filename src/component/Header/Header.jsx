import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/styles';
import {HeaderMenuArea, HeaderLogoArea} from './index';

const useStyles = makeStyles({
    headerColor: {
        backgroundColor: '#ffa64d'
    },
    contents: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tool:{
        display:'flex'
    }
})


const Header = () => {
    const classes = useStyles()
    const IsSignedIn = true;//selectorで参照してサインインしてるかどうか。今は仮でtrue

        return (
            <AppBar className={classes.headerColor}>
                <Toolbar className={classes.contents}>
                    <HeaderLogoArea className={classes.logo} />
                    <div className={classes.tool}>
                        {IsSignedIn && (
                            <HeaderMenuArea />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        )

}

export default Header