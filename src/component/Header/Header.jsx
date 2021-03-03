import React from 'react'
import {useSelector} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/styles';
import {getIsSignedIn} from '../../reducks/user/selectors'
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
    const selector = useSelector(state => state)

    let IsSignedIn = getIsSignedIn(selector)
    IsSignedIn = true
        return (
            <AppBar className={classes.headerColor}>
                <Toolbar className={classes.contents}>
                    <HeaderLogoArea className={classes.logo} />
                    <div className={classes.tool}>
                        {IsSignedIn && (//サインインしていないなら各種ツールは全て使用不可にする
                            <HeaderMenuArea />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        )

}

export default Header